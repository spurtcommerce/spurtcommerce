"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const ProductTranslationRepository_1 = require("../repositories/ProductTranslationRepository");
let ProductTranslationService = class ProductTranslationService {
    constructor(productTranslationService, log) {
        this.productTranslationService = productTranslationService;
        this.log = log;
    }
    // create productTranslation
    save(productTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new productTranslation ');
            return this.productTranslationService.save(productTranslation);
        });
    }
    // create productTranslation
    bulkSave(productTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productTranslationService.save(productTranslation);
        });
    }
    // find Condition
    findOne(productTranslation) {
        return this.productTranslationService.findOne(productTranslation);
    }
    find(productTranslation) {
        return this.productTranslationService.find(productTranslation);
    }
    // find all product translation
    findAll() {
        this.log.info('Find all product translation');
        return this.productTranslationService.find();
    }
    // productTranslation List
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
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.productTranslationService.count(condition);
        }
        else {
            return this.productTranslationService.find(condition);
        }
    }
    // delete productTranslation
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productTranslationService.delete(id);
        });
    }
};
ProductTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductTranslationRepository_1.ProductTranslationRepository, Object])
], ProductTranslationService);
exports.ProductTranslationService = ProductTranslationService;
//# sourceMappingURL=ProductTranslationService.js.map