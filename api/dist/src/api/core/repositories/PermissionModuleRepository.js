"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModuleRepository = void 0;
const tslib_1 = require("tslib");
const PermissionModule_1 = require("../models/PermissionModule");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let PermissionModuleRepository = class PermissionModuleRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PermissionModule_1.PermissionModule);
    }
};
exports.PermissionModuleRepository = PermissionModuleRepository;
exports.PermissionModuleRepository = PermissionModuleRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PermissionModuleRepository);
//# sourceMappingURL=PermissionModuleRepository.js.map