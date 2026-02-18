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
const SiteMapModel_1 = require("../models/SiteMapModel");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let SiteMapRepository = class SiteMapRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SiteMapModel_1.SiteMap);
    }
};
exports.SiteMapRepository = SiteMapRepository;
exports.SiteMapRepository = SiteMapRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SiteMapRepository);
//# sourceMappingURL=SiteMapRepository.js.map