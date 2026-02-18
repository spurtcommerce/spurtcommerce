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
const ProductAnswerLikeDislike_1 = require("../models/ProductAnswerLikeDislike");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductAnswerLikeDislikeRepository = class ProductAnswerLikeDislikeRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductAnswerLikeDislike_1.ProductAnswerLikeDislike);
    }
    findLikeCount(answerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(ProductAnswerLikeDislike_1.ProductAnswerLikeDislike, 'productAnswerLikeDislike');
            query.select('COUNT(productAnswerLikeDislike.id) as likeCount');
            query.where('productAnswerLikeDislike.type = :type AND productAnswerLikeDislike.answerId = :answerId', { type: 1, answerId });
            return query.getRawOne();
        });
    }
    findDislikeCount(answerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(ProductAnswerLikeDislike_1.ProductAnswerLikeDislike, 'productAnswerLikeDislike');
            query.select('COUNT(productAnswerLikeDislike.id) as dislikeCount');
            query.where('productAnswerLikeDislike.type = :type AND productAnswerLikeDislike.answerId = :answerId', { type: 2, answerId });
            return query.getRawOne();
        });
    }
};
exports.ProductAnswerLikeDislikeRepository = ProductAnswerLikeDislikeRepository;
exports.ProductAnswerLikeDislikeRepository = ProductAnswerLikeDislikeRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductAnswerLikeDislikeRepository);
//# sourceMappingURL=ProductAnswerLikeDislikeRepository.js.map