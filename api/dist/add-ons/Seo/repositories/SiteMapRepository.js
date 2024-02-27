"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteMapRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const SiteMapModel_1 = require("../models/SiteMapModel");
let SiteMapRepository = class SiteMapRepository extends typeorm_1.Repository {
};
SiteMapRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(SiteMapModel_1.SiteMap)
], SiteMapRepository);
exports.SiteMapRepository = SiteMapRepository;
//# sourceMappingURL=SiteMapRepository.js.map