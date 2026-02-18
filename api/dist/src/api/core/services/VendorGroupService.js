"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../decorators/Logger");
const VendorGroupRepository_1 = require("../repositories/VendorGroupRepository");
const typeorm_1 = require("typeorm");
let VendorGroupService = class VendorGroupService {
    constructor(vendorGroupRepository, log) {
        this.vendorGroupRepository = vendorGroupRepository;
        this.log = log;
    }
    // find Group
    findOne(findCondition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find group');
            return yield this.vendorGroupRepository.repository.findOne(findCondition);
        });
    }
    // Group list
    list(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], relation = [], whereConditions = [], count) {
            const condition = {};
            if (select && select.length > 0) {
                condition.select = select;
            }
            if (relation && relation.length > 0) {
                condition.relations = relation;
            }
            condition.where = {};
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((table) => {
                    const operator = table.op;
                    if (operator === 'where' && table.value !== undefined) {
                        condition.where[table.name] = table.value;
                    }
                    else if (operator === 'like' && table.value !== undefined) {
                        condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
                    }
                });
            }
            if (limit && limit > 0) {
                condition.take = limit;
                condition.skip = offset;
            }
            if (count) {
                return yield this.vendorGroupRepository.repository.count(condition);
            }
            condition.order = {
                createdDate: 'DESC',
            };
            return yield this.vendorGroupRepository.repository.find(condition);
        });
    }
    // create group
    create(vendorGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorGroupRepository.repository.save(vendorGroup);
        });
    }
    // update group
    update(id, vendorGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update a group');
            vendorGroup.groupId = id;
            return yield this.vendorGroupRepository.repository.save(vendorGroup);
        });
    }
    // delete group
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a group');
            const deleteVendor = yield this.vendorGroupRepository.repository.delete(id);
            return deleteVendor;
        });
    }
    vendorCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorGroupRepository.getVendorCount(id);
        });
    }
};
exports.VendorGroupService = VendorGroupService;
exports.VendorGroupService = VendorGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorGroupRepository_1.VendorGroupRepository, Object])
], VendorGroupService);
//# sourceMappingURL=VendorGroupService.js.map