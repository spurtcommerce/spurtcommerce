"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValueTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const VariantValueTranslationRepository_1 = require("../repositories/VariantValueTranslationRepository");
let VariantValueTranslationService = class VariantValueTranslationService {
    constructor(variantValueTranslationRepository) {
        this.variantValueTranslationRepository = variantValueTranslationRepository;
        // --
    }
    save(variantValueTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.variantValueTranslationRepository.repository.save(variantValueTranslation);
        });
    }
    findOne(data) {
        return this.variantValueTranslationRepository.repository.findOne(data);
    }
    find(data) {
        return this.variantValueTranslationRepository.repository.find(data);
    }
};
exports.VariantValueTranslationService = VariantValueTranslationService;
exports.VariantValueTranslationService = VariantValueTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [VariantValueTranslationRepository_1.VariantValueTranslationRepository])
], VariantValueTranslationService);
//# sourceMappingURL=VariantValueTranslationService.js.map