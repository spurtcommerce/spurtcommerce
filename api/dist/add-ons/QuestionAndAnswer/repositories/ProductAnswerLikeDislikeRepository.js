"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswerLikeDislikeRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductAnswerLikeDislike_1 = require("../models/ProductAnswerLikeDislike");
let ProductAnswerLikeDislikeRepository = class ProductAnswerLikeDislikeRepository extends typeorm_1.Repository {
    findLikeCount(answerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductAnswerLikeDislike_1.ProductAnswerLikeDislike, 'productAnswerLikeDislike');
            query.select('COUNT(productAnswerLikeDislike.id) as likeCount');
            query.where('productAnswerLikeDislike.type = :type AND productAnswerLikeDislike.answerId = :answerId', { type: 1, answerId });
            return query.getRawOne();
        });
    }
    findDislikeCount(answerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductAnswerLikeDislike_1.ProductAnswerLikeDislike, 'productAnswerLikeDislike');
            query.select('COUNT(productAnswerLikeDislike.id) as dislikeCount');
            query.where('productAnswerLikeDislike.type = :type AND productAnswerLikeDislike.answerId = :answerId', { type: 2, answerId });
            return query.getRawOne();
        });
    }
};
ProductAnswerLikeDislikeRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductAnswerLikeDislike_1.ProductAnswerLikeDislike)
], ProductAnswerLikeDislikeRepository);
exports.ProductAnswerLikeDislikeRepository = ProductAnswerLikeDislikeRepository;
//# sourceMappingURL=ProductAnswerLikeDislikeRepository.js.map