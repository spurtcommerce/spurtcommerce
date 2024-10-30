"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PageGroup_1 = require("../models/PageGroup");
let PageGroupRepository = class PageGroupRepository extends typeorm_1.Repository {
};
PageGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PageGroup_1.PageGroup)
], PageGroupRepository);
exports.PageGroupRepository = PageGroupRepository;
//# sourceMappingURL=PageGroupRepository.js.map