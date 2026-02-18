"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupTranslationRepository = void 0;
const tslib_1 = require("tslib");
const AttributeGroupTranslation_1 = require("../models/AttributeGroupTranslation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let AttributeGroupTranslationRepository = class AttributeGroupTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(AttributeGroupTranslation_1.AttributeGroupTranslation);
    }
};
exports.AttributeGroupTranslationRepository = AttributeGroupTranslationRepository;
exports.AttributeGroupTranslationRepository = AttributeGroupTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AttributeGroupTranslationRepository);
//# sourceMappingURL=AttributeGroupTranslationRepository.js.map