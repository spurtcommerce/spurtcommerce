"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPriceLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ProductPriceLogRepository_1 = require("../repositories/ProductPriceLogRepository");
const typeorm_1 = require("typeorm");
let ProductPriceLogService = class ProductPriceLogService {
    constructor(productPriceLogRepository, log) {
        this.productPriceLogRepository = productPriceLogRepository;
        this.log = log;
    }
    // create a data
    create(Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a data');
            return this.productPriceLogRepository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        this.log.info('Find a data');
        return this.productPriceLogRepository.findOne(id);
    }
    // find a data
    findAll(productSpecial) {
        this.log.info('Find a data');
        return this.productPriceLogRepository.find(productSpecial);
    }
    // find a data
    find() {
        this.log.info('Find a data');
        return this.productPriceLogRepository.find();
    }
    // delete product option
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product option value');
            const deleteProductOptionValue = yield this.productPriceLogRepository.delete(id);
            return deleteProductOptionValue;
        });
    }
    // country List
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
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
            return this.productPriceLogRepository.count(condition);
        }
        else {
            return this.productPriceLogRepository.find(condition);
        }
    }
};
ProductPriceLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductPriceLogRepository_1.ProductPriceLogRepository, Object])
], ProductPriceLogService);
exports.ProductPriceLogService = ProductPriceLogService;
//# sourceMappingURL=ProductPriceLogService.js.map