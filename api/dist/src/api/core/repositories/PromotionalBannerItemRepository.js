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
const typeorm_1 = require("typeorm");
const PromotionalBannerItem_1 = require("../models/PromotionalBannerItem");
let PromotionalBannerItemRepository = class PromotionalBannerItemRepository extends typeorm_1.Repository {
    findProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(PromotionalBannerItem_1.PromotionalBannerItem, 'promotionalBannerItem');
            query.select(['promotionalBannerItem.id as id']);
            query.innerJoin('promotionalBannerItem.promotionalBanner', 'promotionalBanner');
            query.where('promotionalBannerItem.refId = :productId', { productId });
            query.andWhere('promotionalBanner.bannerLinkType = :value1', { value1: 2 });
            return query.getRawMany();
        });
    }
    findCategory(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(PromotionalBannerItem_1.PromotionalBannerItem, 'promotionalBannerItem');
            query.select(['promotionalBannerItem.id as id']);
            query.innerJoin('promotionalBannerItem.promotionalBanner', 'promotionalBanner');
            query.where('promotionalBannerItem.refId = :categoryId', { categoryId });
            query.andWhere('promotionalBanner.bannerLinkType = :value1', { value1: 1 });
            return query.getRawMany();
        });
    }
};
PromotionalBannerItemRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PromotionalBannerItem_1.PromotionalBannerItem)
], PromotionalBannerItemRepository);
exports.PromotionalBannerItemRepository = PromotionalBannerItemRepository;
//# sourceMappingURL=PromotionalBannerItemRepository.js.map