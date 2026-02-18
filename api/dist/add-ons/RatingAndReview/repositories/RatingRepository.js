"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRepository = void 0;
const tslib_1 = require("tslib");
const ProductModel_1 = require("../../../src/api/core/models/ProductModel");
const ProductRating_1 = require("../models/ProductRating");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let RatingRepository = class RatingRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductRating_1.ProductRating);
    }
    ratingConsolidate(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const consolidate = yield this.repository.manager.createQueryBuilder(ProductRating_1.ProductRating, 'rating')
                .select(['AVG(rating.rating) as RatingCount'])
                .where('rating.skuId = :skuId', { skuId: id })
                .andWhere('rating.isActive = :value', { value: 1 })
                .getRawOne();
            return consolidate;
        });
    }
    // rating statistics
    ratingStatistics(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(ProductRating_1.ProductRating, 'productRating');
            query.select(['COUNT(productRating.rating) as rating']);
            query.addSelect(['COUNT(productRating.review) as review']);
            query.where('productRating.skuId = :skuId', { skuId: id });
            query.andWhere('productRating.isActive = :value', { value: 1 });
            return query.getRawOne();
        });
    }
    // get review count
    getReviewCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(ProductRating_1.ProductRating, 'productRating');
            query.select(['COUNT(productRating.review) as review']);
            query.where('productRating.skuId = :skuId', { skuId: id });
            query.andWhere('productRating.isActive = :value', { value: 1 });
            query.andWhere('productRating.review IS NOT NULL');
            return query.getRawOne();
        });
    }
    ratingConsolidateForVendor(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const consolidate = yield this.repository.manager.createQueryBuilder(ProductRating_1.ProductRating, 'rating')
                .select(['AVG(rating.rating) as RatingCount', 'COUNT(rating.review) as ReviewCount'])
                .innerJoin('rating.product', 'product')
                .innerJoin('product.vendorProducts', 'vendorProducts')
                .where('vendorProducts.vendorId = :vendorId', { vendorId: id })
                .andWhere('rating.isActive = :value', { value: 1 })
                .getRawOne();
            console.log('consolidate:', consolidate);
            return consolidate;
        });
    }
    productRatingList(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], searchConditions = [], whereConditions = [], count) {
            const query = yield this.repository.manager.createQueryBuilder(ProductRating_1.ProductRating, 'rating');
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // where condition
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((table) => {
                    const operator = table.op;
                    if (operator === 'where' && table.value !== undefined) {
                        const subQb = this.repository.manager
                            .getRepository(ProductModel_1.Product)
                            .createQueryBuilder('product')
                            .select('product_id')
                            .where('name LIKE ' + "'%" + table.value + "%'" + ' ');
                        query.where(table.name + ' IN (' + subQb.getSql() + ')');
                    }
                });
            }
            // Limit & Offset
            if (limit && limit > 0) {
                query.limit(limit);
                query.offset(offset);
            }
            query.orderBy('rating.rating_id', 'DESC');
            if (count) {
                return query.getCount();
            }
            return query.getMany();
        });
    }
};
exports.RatingRepository = RatingRepository;
exports.RatingRepository = RatingRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], RatingRepository);
//# sourceMappingURL=RatingRepository.js.map