/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as express from 'express';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';

import { User } from '../api/core/models/User';
import { UserRepository } from '../api/core/repositories/UserRepository';
import { env } from '../env';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { AccessTokenRepository } from '../api/core/repositories/AccessTokenRepository';
import { UserGroupRepository } from '../api/core/repositories/UserGroupRepository';
import { VendorUsersRepository } from '../api/core/repositories/VendorUsersRepository';
import { VendorUserGroupRepository } from '../api/core/repositories/VendorUserGroupRepository';
import { CustomerUsersRepository } from '../api/core/repositories/CustomerUsersRepository';
// import { CustomerUserGroupRepository } from '../api/core/repositories/CustomerUserGroupRepository';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        private userRepository: UserRepository,
        private customerUsersRepository: CustomerUsersRepository,
        private userGroupRepository: UserGroupRepository,
        private accessTokenRepository: AccessTokenRepository,
        private vendorUsersRepository: VendorUsersRepository,
        private vendorUserGroupRepository: VendorUserGroupRepository
        // private customerUserGroupRepository: CustomerUserGroupRepository
    ) { }

    public async parseBasicAuthFromRequest(request: express.Request): Promise<any> {
        const authorization = request.header('authorization');
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('Credentials provided by the client');
            if (!authorization) {
                return undefined;
            }
            const UserId = await this.decryptToken(authorization.split(' ')[1]);
            return UserId;
        }
        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public async decryptToken(encryptString: string): Promise<any> {
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(encryptString, env.cryptoSecret);
        const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
        return new Promise<any>((subresolve, subreject) => {
            jwt.verify(originalEncryptedString, env.jwtSecret, (err, decoded: any) => {
                if (err) {
                    return subresolve(undefined);
                }
                return subresolve({ id: decoded.id, role: decoded.role });
            });
        });
    }

    public async validateUser(userId: number): Promise<User> {
        const user = await this.userRepository.repository.findOne({
            where: {
                userId, deleteFlag: 0, isActive: 1,
            },
        });
        if (user) {
            return user;
        }

        return undefined;
    }

    public async validateUSerCustomer(userId: number): Promise<any> {
        const customerUser = await this.customerUsersRepository.repository.findOne({
            where: {
                id: userId, isActive: 1, deleteFlag: 0,
            },
            relations: ['customer', 'customerUserGroups'],
        });
        if (customerUser) {
            return customerUser;
        }
        return undefined;
    }

    public async validateCustomerUserGroup(userGroupId: number): Promise<any> {
        // const group = await this.customerUserGroupRepository.repository.findOne({
        //     where: {
        //         id: userGroupId,
        //     },
        // });
        // if (group) {
        //     return group;
        // }
        return undefined;
    }

    public async validateVendor(userId: number): Promise<any> { // change to vendorUser table
        const vendorUser = await this.vendorUsersRepository.repository.findOne({
            where: {
                id: userId,
            }, relations: ['vendor', 'vendor.customer'],
        });
        if (vendorUser) {
            if (vendorUser.isActive === 1 && vendorUser.deleteFlag === 0 && vendorUser.vendor.approvalFlag === 1) {
                return vendorUser;
            }
        }
        return undefined;
    }

    public async validateUnapprovedVendor(userId: number): Promise<any> {
        const vendorUser = await this.vendorUsersRepository.repository.findOne({
            where: {
                id: userId,
            }, relations: ['vendor', 'vendor.customer'],
        });

        if (vendorUser) {
            if (vendorUser.isActive === 1 && vendorUser.deleteFlag === 0) {
                return vendorUser;
            }
        }
        // const vendors = await this.vendorRepository.findOne({
        //     where: {
        //         vendorId: userId,
        //     }, relations: ['customer'],
        // });
        // if (vendors) {
        //     if (vendors.isActive === 1 && vendors.isDelete === 0) {
        //         return vendors;
        //     }
        // }
        return undefined;
    }

    public async checkTokenExist(request: express.Request): Promise<number> {

        const authorization = request.header('authorization');
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('Credentials provided by the client');
            if (!authorization) {
                return undefined;
            }
            const token = authorization.split(' ')[1];
            const Crypto = require('crypto-js');
            const bytes = Crypto.AES.decrypt(token, env.cryptoSecret);
            const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
            const checkTokenRevoke: any = await this.accessTokenRepository.repository.findOne({
                where: {
                    token: originalEncryptedString,
                },
            });
            return checkTokenRevoke;
        }
        this.log.info('No credentials provided by the client');
        return undefined;

    }

    public async validateUserGroup(userGroupId: number): Promise<any> { // change to vendorUserGroup table
        const group = await this.userGroupRepository.repository.findOne({
            where: {
                groupId: userGroupId,
            },
        });
        if (group) {
            return group;
        }
        return undefined;
    }

    public async validateVendorUserGroup(userGroupId: number): Promise<any> { // change to vendorUserGroup table
        const group = await this.vendorUserGroupRepository.repository.findOne({
            where: {
                id: userGroupId,
            },
        });
        if (group) {
            return group;
        }
        return undefined;
    }

}
