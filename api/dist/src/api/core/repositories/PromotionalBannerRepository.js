"use strict";
/*
 * Spurtcommerce PRO
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalBannerRepository = void 0;
const tslib_1 = require("tslib");
const PromotionalBanner_1 = require("../models/PromotionalBanner");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let PromotionalBannerRepository = class PromotionalBannerRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PromotionalBanner_1.PromotionalBanner);
    }
};
exports.PromotionalBannerRepository = PromotionalBannerRepository;
exports.PromotionalBannerRepository = PromotionalBannerRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PromotionalBannerRepository);
//# sourceMappingURL=PromotionalBannerRepository.js.map