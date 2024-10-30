"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderProductsService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const VendorOrderProductsRepository_1 = require("../repositories/VendorOrderProductsRepository");
const typeorm_1 = require("typeorm");
let VendorOrderProductsService = class VendorOrderProductsService {
    constructor(vendorOrderProductsRepository, log) {
        this.vendorOrderProductsRepository = vendorOrderProductsRepository;
        this.log = log;
    }
    // find Role
    findOne(findCondition) {
        this.log.info('Find role');
        return this.vendorOrderProductsRepository.findOne(findCondition);
    }
    // Role list
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
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
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorOrderProductsRepository.count(condition);
        }
        return this.vendorOrderProductsRepository.find(condition);
    }
    // create role
    create(vendorOrderProduct) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newvendorOrderProduct = yield this.vendorOrderProductsRepository.save(vendorOrderProduct);
            return newvendorOrderProduct;
        });
    }
    // update role
    update(id, vendorOrderProducts) {
        this.log.info('Update a vendorOrders');
        vendorOrderProducts.vendorOrderProductId = id;
        return this.vendorOrderProductsRepository.save(vendorOrderProducts);
    }
    // delete role
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a vendorOrders');
            const deleteVendorOrderProducts = yield this.vendorOrderProductsRepository.delete(id);
            return deleteVendorOrderProducts;
        });
    }
    // find Services
    findAll(data) {
        return this.vendorOrderProductsRepository.find(data);
    }
};
VendorOrderProductsService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorOrderProductsRepository_1.VendorOrderProductsRepository, Object])
], VendorOrderProductsService);
exports.VendorOrderProductsService = VendorOrderProductsService;
//# sourceMappingURL=VendorOrderProductsService.js.map