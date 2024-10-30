"use strict";
/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalBannerRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PromotionalBanner_1 = require("../models/PromotionalBanner");
let PromotionalBannerRepository = class PromotionalBannerRepository extends typeorm_1.Repository {
};
PromotionalBannerRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PromotionalBanner_1.PromotionalBanner)
], PromotionalBannerRepository);
exports.PromotionalBannerRepository = PromotionalBannerRepository;
//# sourceMappingURL=PromotionalBannerRepository.js.map