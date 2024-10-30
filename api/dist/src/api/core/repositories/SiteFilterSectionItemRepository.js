"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSectionItemRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const SiteFilterSectionItem_1 = require("../models/SiteFilterSectionItem");
let SiteFilterSectionItemRepository = class SiteFilterSectionItemRepository extends typeorm_1.Repository {
};
SiteFilterSectionItemRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(SiteFilterSectionItem_1.SiteFilterSectionItem)
], SiteFilterSectionItemRepository);
exports.SiteFilterSectionItemRepository = SiteFilterSectionItemRepository;
//# sourceMappingURL=SiteFilterSectionItemRepository.js.map