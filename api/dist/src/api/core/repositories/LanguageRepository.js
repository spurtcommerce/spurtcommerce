"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRepository = void 0;
const tslib_1 = require("tslib");
const Language_1 = require("../models/Language");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let LanguageRepository = class LanguageRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Language_1.Language);
    }
};
exports.LanguageRepository = LanguageRepository;
exports.LanguageRepository = LanguageRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], LanguageRepository);
//# sourceMappingURL=LanguageRepository.js.map