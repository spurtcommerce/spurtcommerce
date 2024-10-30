"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupTranslationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PageGroupTranslation_1 = require("../models/PageGroupTranslation");
let PageGroupTranslationRepository = class PageGroupTranslationRepository extends typeorm_1.Repository {
};
PageGroupTranslationRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PageGroupTranslation_1.PageGroupTranslation)
], PageGroupTranslationRepository);
exports.PageGroupTranslationRepository = PageGroupTranslationRepository;
//# sourceMappingURL=PageGroupTranslationRepository.js.map