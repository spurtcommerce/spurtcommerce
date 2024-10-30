"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Setting_1 = require("../models/Setting");
let SettingsRepository = class SettingsRepository extends typeorm_1.Repository {
};
SettingsRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Setting_1.Settings)
], SettingsRepository);
exports.SettingsRepository = SettingsRepository;
//# sourceMappingURL=SettingsRepository.js.map