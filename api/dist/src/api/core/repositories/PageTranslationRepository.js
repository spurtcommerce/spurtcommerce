"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTranslationRepository = void 0;
const tslib_1 = require("tslib");
const PageTranslation_1 = require("../models/PageTranslation");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let PageTranslationRepository = class PageTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PageTranslation_1.PageTranslation);
    }
};
exports.PageTranslationRepository = PageTranslationRepository;
exports.PageTranslationRepository = PageTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PageTranslationRepository);
//# sourceMappingURL=PageTranslationRepository.js.map