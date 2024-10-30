"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const ProductImageRepository_1 = require("../repositories/ProductImageRepository");
let ProductImageService = class ProductImageService {
    constructor(productImageRepository, log) {
        this.productImageRepository = productImageRepository;
        this.log = log;
    }
    // create product
    create(productImage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new productImage ');
            return this.productImageRepository.save(productImage);
        });
    }
    // find one product image
    findOne(productImage) {
        return this.productImageRepository.findOne(productImage);
    }
    // find all product images
    findAll(productImage) {
        return this.productImageRepository.find(productImage);
    }
    // find all product images
    find() {
        return this.productImageRepository.find();
    }
    // update product images
    update(id, productImage) {
        this.log.info('Update a productImage');
        productImage.productImageId = id;
        return this.productImageRepository.save(productImage);
    }
    // ProductImage List
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
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productImageRepository.count(condition);
        }
        else {
            return this.productImageRepository.find(condition);
        }
    }
    // delete product image
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productImageRepository.delete(id);
        });
    }
    // delete product
    deleteProduct(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productImageRepository.delete({ productId: id });
        });
    }
};
ProductImageService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductImageRepository_1.ProductImageRepository, Object])
], ProductImageService);
exports.ProductImageService = ProductImageService;
//# sourceMappingURL=ProductImageService.js.map