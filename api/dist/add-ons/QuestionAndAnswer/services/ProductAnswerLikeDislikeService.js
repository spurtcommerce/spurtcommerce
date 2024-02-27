"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswerLikeService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ProductAnswerLikeDislikeRepository_1 = require("../repositories/ProductAnswerLikeDislikeRepository");
const index_1 = require("typeorm/index");
let ProductAnswerLikeService = class ProductAnswerLikeService {
    constructor(productAnswerLikeRepository) {
        this.productAnswerLikeRepository = productAnswerLikeRepository;
    }
    // create product answer like dislike
    create(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productAnswerLikeRepository.save(product);
            return newProduct;
        });
    }
    // find product answer like dislike
    findAll(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productAnswerLikeRepository.find(data);
        });
    }
    // find product answer like dislike
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
            return this.productAnswerLikeRepository.count(condition);
        }
        else {
            return this.productAnswerLikeRepository.find(condition);
        }
    }
    // delete productAnswerLikeRepository
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productAnswerLikeRepository.delete(id);
            return newProduct;
        });
    }
    // find one productAnswerLikeRepository
    findOne(data) {
        return this.productAnswerLikeRepository.findOne(data);
    }
    // find like count
    findLikeCount(answerId) {
        return this.productAnswerLikeRepository.findLikeCount(answerId);
    }
    // find dislike count
    findDislikeCount(answerId) {
        return this.productAnswerLikeRepository.findDislikeCount(answerId);
    }
};
ProductAnswerLikeService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [ProductAnswerLikeDislikeRepository_1.ProductAnswerLikeDislikeRepository])
], ProductAnswerLikeService);
exports.ProductAnswerLikeService = ProductAnswerLikeService;
//# sourceMappingURL=ProductAnswerLikeDislikeService.js.map