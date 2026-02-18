"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValueTranslationRepository = void 0;
const tslib_1 = require("tslib");
const VariantValueTranslation_1 = require("../models/VariantValueTranslation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VariantValueTranslationRepository = class VariantValueTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VariantValueTranslation_1.VariantValueTranslation);
    }
};
exports.VariantValueTranslationRepository = VariantValueTranslationRepository;
exports.VariantValueTranslationRepository = VariantValueTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VariantValueTranslationRepository);
//# sourceMappingURL=VariantValueTranslationRepository.js.map