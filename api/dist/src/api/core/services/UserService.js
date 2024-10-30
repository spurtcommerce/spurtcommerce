"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const UserRepository_1 = require("../repositories/UserRepository");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    constructor(userLoginRepository, log) {
        this.userLoginRepository = userLoginRepository;
        this.log = log;
    }
    // find user
    findOne(findCondition) {
        this.log.info('Find all users');
        return this.userLoginRepository.findOne(findCondition);
    }
    // user list
    list(limit = 0, offset = 0, select = [], relation = [], whereConditions = [], keyword, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (keyword) {
            condition.where = [{
                    firstName: (0, typeorm_1.Like)('%' + keyword + '%'),
                },
                {
                    lastName: (0, typeorm_1.Like)('%' + keyword + '%'),
                }];
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.userLoginRepository.count(condition);
        }
        else {
            return this.userLoginRepository.find(condition);
        }
    }
    // create user
    create(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new user => ', user.toString());
            const newUser = yield this.userLoginRepository.save(user);
            return newUser;
        });
    }
    // update user
    update(id, user) {
        this.log.info('Update a user');
        user.userId = id;
        return this.userLoginRepository.save(user);
    }
    // delete user
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a user');
            const newUser = yield this.userLoginRepository.delete(id);
            return newUser;
        });
    }
    // find user
    findAll(findCondition) {
        this.log.info('Find all users');
        return this.userLoginRepository.find(findCondition);
    }
};
UserService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [UserRepository_1.UserRepository, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map