"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantTranslationRepository = void 0;
const tslib_1 = require("tslib");
const VariantTranslation_1 = require("../models/VariantTranslation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VariantTranslationRepository = class VariantTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VariantTranslation_1.VariantTranslation);
    }
};
exports.VariantTranslationRepository = VariantTranslationRepository;
exports.VariantTranslationRepository = VariantTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VariantTranslationRepository);
//# sourceMappingURL=VariantTranslationRepository.js.map