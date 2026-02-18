"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSectionItemRepository = void 0;
const tslib_1 = require("tslib");
const SiteFilterSectionItem_1 = require("../models/SiteFilterSectionItem");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let SiteFilterSectionItemRepository = class SiteFilterSectionItemRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SiteFilterSectionItem_1.SiteFilterSectionItem);
    }
};
exports.SiteFilterSectionItemRepository = SiteFilterSectionItemRepository;
exports.SiteFilterSectionItemRepository = SiteFilterSectionItemRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SiteFilterSectionItemRepository);
//# sourceMappingURL=SiteFilterSectionItemRepository.js.map