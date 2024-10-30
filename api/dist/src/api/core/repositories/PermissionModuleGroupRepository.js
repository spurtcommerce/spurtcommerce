"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModuleGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PermissionModuleGroup_1 = require("../models/PermissionModuleGroup");
let PermissionModuleGroupRepository = class PermissionModuleGroupRepository extends typeorm_1.Repository {
};
PermissionModuleGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PermissionModuleGroup_1.PermissionModuleGroup)
], PermissionModuleGroupRepository);
exports.PermissionModuleGroupRepository = PermissionModuleGroupRepository;
//# sourceMappingURL=PermissionModuleGroupRepository.js.map