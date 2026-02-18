"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTranslationRepository = void 0;
const tslib_1 = require("tslib");
const AttributeTranslation_1 = require("../models/AttributeTranslation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let AttributeTranslationRepository = class AttributeTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(AttributeTranslation_1.AttributeTranslation);
    }
};
exports.AttributeTranslationRepository = AttributeTranslationRepository;
exports.AttributeTranslationRepository = AttributeTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AttributeTranslationRepository);
//# sourceMappingURL=AttributeTranslationRepository.js.map