"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRepository = void 0;
const tslib_1 = require("tslib");
const Setting_1 = require("../models/Setting");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let SettingsRepository = class SettingsRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Setting_1.Settings);
    }
};
exports.SettingsRepository = SettingsRepository;
exports.SettingsRepository = SettingsRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SettingsRepository);
//# sourceMappingURL=SettingsRepository.js.map