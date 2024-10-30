"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToCategoryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ProductToCategoryRepository_1 = require("../repositories/ProductToCategoryRepository");
const typeorm_1 = require("typeorm");
let ProductToCategoryService = class ProductToCategoryService {
    constructor(productToCategoryRepository, log) {
        this.productToCategoryRepository = productToCategoryRepository;
        this.log = log;
    }
    // findOne condition
    findOne(findCondition) {
        this.log.info('Find all product');
        return this.productToCategoryRepository.findOne(findCondition);
    }
    // find all product
    findAll(findCondition) {
        this.log.info('Find all product');
        return this.productToCategoryRepository.find(findCondition);
    }
    // find all product
    find() {
        this.log.info('Find all product');
        return this.productToCategoryRepository.find();
    }
    // product list
    list(limit, offset, select = [], relation = [], whereConditions = [], price, count) {
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
                const operator = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
            });
        }
        if (price && price === 1) {
            condition.order = {
                price: 'ASC',
            };
        }
        if (price && price === 2) {
            condition.order = {
                price: 'DESC',
            };
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productToCategoryRepository.count(condition);
        }
        return this.productToCategoryRepository.find(condition);
    }
    // create product
    create(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productToCategoryRepository.save(product);
            return newProduct;
        });
    }
    // update product
    update(id, product) {
        this.log.info('Update a product');
        product.productId = id;
        return this.productToCategoryRepository.save(product);
    }
    // delete product
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product');
            const newProduct = yield this.productToCategoryRepository.delete(id);
            return newProduct;
        });
    }
};
ProductToCategoryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductToCategoryRepository_1.ProductToCategoryRepository, Object])
], ProductToCategoryService);
exports.ProductToCategoryService = ProductToCategoryService;
//# sourceMappingURL=ProductToCategoryService.js.map