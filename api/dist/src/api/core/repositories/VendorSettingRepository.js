"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGlobalSettingRepository = void 0;
const tslib_1 = require("tslib");
const VendorGlobalSettings_1 = require("../models/VendorGlobalSettings");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorGlobalSettingRepository = class VendorGlobalSettingRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorGlobalSettings_1.VendorGlobalSetting);
    }
};
exports.VendorGlobalSettingRepository = VendorGlobalSettingRepository;
exports.VendorGlobalSettingRepository = VendorGlobalSettingRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorGlobalSettingRepository);
//# sourceMappingURL=VendorSettingRepository.js.map