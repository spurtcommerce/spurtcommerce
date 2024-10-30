"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGlobalSettingRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorGlobalSettings_1 = require("../models/VendorGlobalSettings");
let VendorGlobalSettingRepository = class VendorGlobalSettingRepository extends typeorm_1.Repository {
};
VendorGlobalSettingRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorGlobalSettings_1.VendorGlobalSetting)
], VendorGlobalSettingRepository);
exports.VendorGlobalSettingRepository = VendorGlobalSettingRepository;
//# sourceMappingURL=VendorSettingRepository.js.map