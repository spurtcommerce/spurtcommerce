"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRepository = void 0;
const tslib_1 = require("tslib");
const Banner_1 = require("../models/Banner");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let BannerRepository = class BannerRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Banner_1.Banner);
    }
};
exports.BannerRepository = BannerRepository;
exports.BannerRepository = BannerRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], BannerRepository);
//# sourceMappingURL=BannerRepository.js.map