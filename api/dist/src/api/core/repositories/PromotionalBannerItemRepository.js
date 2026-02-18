"use strict";
/*
 * Spurtcommerce PRO
 * version 4.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalBannerItemRepository = void 0;
const tslib_1 = require("tslib");
const PromotionalBannerItem_1 = require("../models/PromotionalBannerItem");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let PromotionalBannerItemRepository = class PromotionalBannerItemRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PromotionalBannerItem_1.PromotionalBannerItem);
    }
    findProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('promotionalBannerItem');
            query.select(['promotionalBannerItem.id as id']);
            query.innerJoin('promotionalBannerItem.promotionalBanner', 'promotionalBanner');
            query.where('promotionalBannerItem.refId = :productId', { productId });
            query.andWhere('promotionalBanner.bannerLinkType = :value1', { value1: 2 });
            return query.getRawMany();
        });
    }
    findCategory(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('promotionalBannerItem');
            query.select(['promotionalBannerItem.id as id']);
            query.innerJoin('promotionalBannerItem.promotionalBanner', 'promotionalBanner');
            query.where('promotionalBannerItem.refId = :categoryId', { categoryId });
            query.andWhere('promotionalBanner.bannerLinkType = :value1', { value1: 1 });
            return query.getRawMany();
        });
    }
};
exports.PromotionalBannerItemRepository = PromotionalBannerItemRepository;
exports.PromotionalBannerItemRepository = PromotionalBannerItemRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PromotionalBannerItemRepository);
//# sourceMappingURL=PromotionalBannerItemRepository.js.map