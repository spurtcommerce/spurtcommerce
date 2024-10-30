"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const SiteFilter_1 = require("../models/SiteFilter");
let SiteFilterRepository = class SiteFilterRepository extends typeorm_1.Repository {
};
SiteFilterRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(SiteFilter_1.SiteFilter)
], SiteFilterRepository);
exports.SiteFilterRepository = SiteFilterRepository;
//# sourceMappingURL=SiteFilterRepository.js.map