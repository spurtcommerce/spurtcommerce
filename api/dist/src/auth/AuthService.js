"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const UserRepository_1 = require("../api/core/repositories/UserRepository");
const CustomerRepository_1 = require("../api/core/repositories/CustomerRepository");
const VendorRepository_1 = require("../api/core/repositories/VendorRepository");
const env_1 = require("../env");
const Logger_1 = require("../decorators/Logger");
const AccessTokenRepository_1 = require("../api/core/repositories/AccessTokenRepository");
const UserGroupRepository_1 = require("../api/core/repositories/UserGroupRepository");
let AuthService = class AuthService {
    constructor(log, userRepository, customerRepository, vendorRepository, userGroupRepository, accessTokenRepository) {
        this.log = log;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.vendorRepository = vendorRepository;
        this.userGroupRepository = userGroupRepository;
        this.accessTokenRepository = accessTokenRepository;
    }
    parseBasicAuthFromRequest(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const authorization = req.header('authorization');
            if (authorization && authorization.split(' ')[0] === 'Bearer') {
                this.log.info('Credentials provided by the client');
                if (!authorization) {
                    return undefined;
                }
                const UserId = yield this.decryptToken(authorization.split(' ')[1]);
                console.log(JSON.stringify(UserId) + 'UserId:');
                return UserId;
            }
            this.log.info('No credentials provided by the client');
            return undefined;
        });
    }
    decryptToken(encryptString) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Crypto = require('crypto-js');
            const bytes = Crypto.AES.decrypt(encryptString, env_1.env.cryptoSecret);
            const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
            return new Promise((subresolve, subreject) => {
                jsonwebtoken_1.default.verify(originalEncryptedString, env_1.env.jwtSecret, (err, decoded) => {
                    if (err) {
                        return subresolve(undefined);
                    }
                    return subresolve({ id: decoded.id, role: decoded.role });
                });
            });
        });
    }
    validateUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: {
                    userId, deleteFlag: 0, isActive: 1,
                },
            });
            if (user) {
                return user;
            }
            return undefined;
        });
    }
    validateCustomer(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.findOne({
                where: {
                    id: userId, isActive: 1, deleteFlag: 0,
                },
            });
            if (customer) {
                return customer;
            }
            return undefined;
        });
    }
    validateVendor(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendors = yield this.vendorRepository.findOne({
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
        });
    }
    validateUnapprovedVendor(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendors = yield this.vendorRepository.findOne({
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
        });
    }
    checkTokenExist(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const authorization = req.header('authorization');
            if (authorization && authorization.split(' ')[0] === 'Bearer') {
                this.log.info('Credentials provided by the client');
                if (!authorization) {
                    return undefined;
                }
                const token = authorization.split(' ')[1];
                const Crypto = require('crypto-js');
                const bytes = Crypto.AES.decrypt(token, env_1.env.cryptoSecret);
                const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
                const checkTokenRevoke = yield this.accessTokenRepository.findOne({
                    where: {
                        token: originalEncryptedString,
                    },
                });
                return checkTokenRevoke;
            }
            this.log.info('No credentials provided by the client');
            return undefined;
        });
    }
    validateUserGroup(userGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const group = yield this.userGroupRepository.findOne({
                where: {
                    groupId: userGroupId,
                },
            });
            if (group) {
                return group;
            }
            return undefined;
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, Logger_1.Logger)(__filename)),
    tslib_1.__param(1, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(2, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(3, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(4, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(5, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [Object, UserRepository_1.UserRepository,
        CustomerRepository_1.CustomerRepository,
        VendorRepository_1.VendorRepository,
        UserGroupRepository_1.UserGroupRepository,
        AccessTokenRepository_1.AccessTokenRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map