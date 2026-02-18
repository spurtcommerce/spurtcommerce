"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSectionRepository = void 0;
const tslib_1 = require("tslib");
const SiteFilterSection_1 = require("../models/SiteFilterSection");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let SiteFilterSectionRepository = class SiteFilterSectionRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SiteFilterSection_1.SiteFilterSection);
    }
};
exports.SiteFilterSectionRepository = SiteFilterSectionRepository;
exports.SiteFilterSectionRepository = SiteFilterSectionRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SiteFilterSectionRepository);
//# sourceMappingURL=SiteFilterSectionRepository.js.map