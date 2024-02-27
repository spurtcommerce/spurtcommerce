"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const VendorRepository_1 = require("../repositories/VendorRepository");
let VendorService = class VendorService {
    constructor(vendorRepository, log) {
        this.vendorRepository = vendorRepository;
        this.log = log;
    }
    // create customer
    create(vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new vendor');
            return this.vendorRepository.save(vendor);
        });
    }
    // find Condition
    findOne(vendor) {
        return this.vendorRepository.findOne(vendor);
    }
    // find Condition
    findAll(condition) {
        return this.vendorRepository.find(condition ? condition : 1);
    }
    // find Condition
    find(data) {
        return this.vendorRepository.find(data);
    }
    // update vendor
    update(id, vendor) {
        vendor.vendorId = id;
        return this.vendorRepository.save(vendor);
    }
    // vendor List
    list(limit, offset, select = [], search = [], whereConditions = [], relation = [], order, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                const operator = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = (0, index_1.Like)('%' + item.value + '%');
                }
            });
        }
        if (relation && relation.length > 0) {
            condition.relation = relation;
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (order && order > 0) {
            condition.order = {
                createdDate: 'DESC',
            };
            condition.take = 5;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorRepository.count(condition);
        }
        else {
            return this.vendorRepository.find(condition);
        }
    }
    // vendor list
    vendorList(limit, offset, select = [], relations = [], searchConditions = [], whereConditions = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.vendorList(limit, offset, select, relations, searchConditions, whereConditions, count);
        });
    }
    // delete customer
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.delete(id);
        });
    }
    slugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.vendorSlug(data);
        });
    }
    slugDataOne(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.vendorSlugOne(data);
        });
    }
    slugDataWithEmptySlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.vendorSlugEmptySlug(data);
        });
    }
    validateDisplayUrlName(data, checkVendor, vendorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorRepository.validateDisplayUrlName(data, checkVendor, vendorId);
        });
    }
};
VendorService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorRepository_1.VendorRepository, Object])
], VendorService);
exports.VendorService = VendorService;
//# sourceMappingURL=VendorService.js.map