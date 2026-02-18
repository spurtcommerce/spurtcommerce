"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupTranslationRepository = void 0;
const tslib_1 = require("tslib");
const PageGroupTranslation_1 = require("../models/PageGroupTranslation");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let PageGroupTranslationRepository = class PageGroupTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PageGroupTranslation_1.PageGroupTranslation);
    }
};
exports.PageGroupTranslationRepository = PageGroupTranslationRepository;
exports.PageGroupTranslationRepository = PageGroupTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PageGroupTranslationRepository);
//# sourceMappingURL=PageGroupTranslationRepository.js.map