"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorContactService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../decorators/Logger");
const typeorm_1 = require("typeorm");
const VendorContactRepository_1 = require("../repositories/VendorContactRepository");
let VendorContactService = class VendorContactService {
    constructor(vendorContactRepository, log) {
        this.vendorContactRepository = vendorContactRepository;
        this.log = log;
    }
    // find user
    findOne(findCondition) {
        this.log.info('Find all vendor contact');
        return this.vendorContactRepository.repository.findOne(findCondition);
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
            condition.where = {
                firstName: (0, typeorm_1.Like)('%' + keyword + '%'),
            };
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorContactRepository.repository.count(condition);
        }
        else {
            return this.vendorContactRepository.repository.find(condition);
        }
    }
    // create user
    create(vendorContact) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.vendorContactRepository.repository.save(vendorContact);
            return newUser;
        });
    }
    // update user
    update(id, vendorContact) {
        return this.vendorContactRepository.repository.save(vendorContact);
    }
    // delete user
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.vendorContactRepository.repository.delete(id);
            return newUser;
        });
    }
    // find user
    findAll(findCondition) {
        return this.vendorContactRepository.repository.find(findCondition);
    }
};
exports.VendorContactService = VendorContactService;
exports.VendorContactService = VendorContactService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorContactRepository_1.VendorContactRepository, Object])
], VendorContactService);
//# sourceMappingURL=VendorContactService.js.map