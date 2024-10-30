"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorInvoiceItemService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const VendorInvoiceItemRepository_1 = require("../repositories/VendorInvoiceItemRepository");
const typeorm_1 = require("typeorm");
let VendorInvoiceItemService = class VendorInvoiceItemService {
    constructor(vendorInvoiceItemRepository, log) {
        this.vendorInvoiceItemRepository = vendorInvoiceItemRepository;
        this.log = log;
    }
    // find
    findOne(findCondition) {
        this.log.info('Find role');
        return this.vendorInvoiceItemRepository.findOne(findCondition);
    }
    // list
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
            return this.vendorInvoiceItemRepository.count(condition);
        }
        return this.vendorInvoiceItemRepository.find(condition);
    }
    // create
    create(vendorInvoiceItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newvendorInvoiceItem = yield this.vendorInvoiceItemRepository.save(vendorInvoiceItem);
            return newvendorInvoiceItem;
        });
    }
    // update
    update(id, vendorInvoiceItem) {
        this.log.info('Update a vendorInvoiceItem');
        vendorInvoiceItem.vendorInvoiceItemId = id;
        return this.vendorInvoiceItemRepository.save(vendorInvoiceItem);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a vendorOrders');
            const deleteVendorInvoiceItem = yield this.vendorInvoiceItemRepository.delete(id);
            return deleteVendorInvoiceItem;
        });
    }
    // find Services
    findAll(data) {
        return this.vendorInvoiceItemRepository.find(data);
    }
};
VendorInvoiceItemService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorInvoiceItemRepository_1.VendorInvoiceItemRepository, Object])
], VendorInvoiceItemService);
exports.VendorInvoiceItemService = VendorInvoiceItemService;
//# sourceMappingURL=VendorInvoiceItemService.js.map