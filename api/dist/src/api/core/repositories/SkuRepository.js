"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuRepository = void 0;
const tslib_1 = require("tslib");
const SkuModel_1 = require("../models/SkuModel");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let SkuRepository = class SkuRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SkuModel_1.Sku);
    }
};
exports.SkuRepository = SkuRepository;
exports.SkuRepository = SkuRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SkuRepository);
//# sourceMappingURL=SkuRepository.js.map