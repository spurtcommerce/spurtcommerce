/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as express from 'express';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from '../api/core/models/User';
import { UserRepository } from '../api/core/repositories/UserRepository';
import { CustomerRepository } from '../api/core/repositories/CustomerRepository';
import { VendorRepository } from '../api/core/repositories/VendorRepository';
import { env } from '../env';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { AccessTokenRepository } from '../api/core/repositories/AccessTokenRepository';
import { UserGroupRepository } from '../api/core/repositories/UserGroupRepository';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private customerRepository: CustomerRepository,
        @OrmRepository() private vendorRepository: VendorRepository,
        @OrmRepository() private userGroupRepository: UserGroupRepository,
        @OrmRepository() private accessTokenRepository: AccessTokenRepository
    ) { }

    public async parseBasicAuthFromRequest(req: express.Request): Promise<any> {
        const authorization = req.header('authorization');
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('Credentials provided by the client');
            if (!authorization) {
                return undefined;
            }
            const UserId = await this.decryptToken(authorization.split(' ')[1]);
            console.log(JSON.stringify(UserId) + 'UserId:');
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
        const user = await this.userRepository.findOne({
            where: {
                userId, deleteFlag: 0, isActive: 1,
            },
        });
        if (user) {
            return user;
        }

        return undefined;
    }

    public async validateCustomer(userId: number): Promise<any> {
        const customer = await this.customerRepository.findOne({
            where: {
                id: userId, isActive: 1, deleteFlag: 0,
            },
        });
        if (customer) {
            return customer;
        }
        return undefined;
    }

    public async validateVendor(userId: number): Promise<any> {
        const vendors = await this.vendorRepository.findOne({
            where: {
                vendorId: userId,
            }, relations: ['customer'],
        });
        if (vendors) {
            if (vendors.isActive === 1 && vendors.isDelete === 0 && vendors.approvalFlag === 1) {
                return vendors;
            }
        }
        return undefined;
    }

    public async validateUnapprovedVendor(userId: number): Promise<any> {
        const vendors = await this.vendorRepository.findOne({
            where: {
                vendorId: userId,
            }, relations: ['customer'],
        });
        if (vendors) {
            if (vendors.isActive === 1 && vendors.isDelete === 0) {
                return vendors;
            }
        }
        return undefined;
    }

    public async checkTokenExist(req: express.Request): Promise<number> {

        const authorization = req.header('authorization');
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('Credentials provided by the client');
            if (!authorization) {
                return undefined;
            }
            const token = authorization.split(' ')[1];
            const Crypto = require('crypto-js');
            const bytes = Crypto.AES.decrypt(token, env.cryptoSecret);
            const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
            const checkTokenRevoke: any = await this.accessTokenRepository.findOne({
                where: {
                    token: originalEncryptedString,
                },
            });
            return checkTokenRevoke;
        }
        this.log.info('No credentials provided by the client');
        return undefined;

    }

    public async validateUserGroup(userGroupId: number): Promise<any> {
        const group = await this.userGroupRepository.findOne({
            where: {
                groupId: userGroupId,
            },
        });
        if (group) {
            return group;
        }
        return undefined;
    }

}
