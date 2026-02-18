"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModuleGroupRepository = void 0;
const tslib_1 = require("tslib");
const PermissionModuleGroup_1 = require("../models/PermissionModuleGroup");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let PermissionModuleGroupRepository = class PermissionModuleGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PermissionModuleGroup_1.PermissionModuleGroup);
    }
};
exports.PermissionModuleGroupRepository = PermissionModuleGroupRepository;
exports.PermissionModuleGroupRepository = PermissionModuleGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PermissionModuleGroupRepository);
//# sourceMappingURL=PermissionModuleGroupRepository.js.map