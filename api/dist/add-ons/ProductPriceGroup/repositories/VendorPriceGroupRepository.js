"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupRepository = void 0;
const tslib_1 = require("tslib");
const VendorPriceGroup_1 = require("../models/VendorPriceGroup");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorPriceGroupRepository = class VendorPriceGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorPriceGroup_1.VendorPriceGroup);
    }
};
exports.VendorPriceGroupRepository = VendorPriceGroupRepository;
exports.VendorPriceGroupRepository = VendorPriceGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorPriceGroupRepository);
//# sourceMappingURL=VendorPriceGroupRepository.js.map