"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTranslationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PageTranslation_1 = require("../models/PageTranslation");
let PageTranslationRepository = class PageTranslationRepository extends typeorm_1.Repository {
};
PageTranslationRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PageTranslation_1.PageTranslation)
], PageTranslationRepository);
exports.PageTranslationRepository = PageTranslationRepository;
//# sourceMappingURL=PageTranslationRepository.js.map