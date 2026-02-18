"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const VariantTranslationRepository_1 = require("../repositories/VariantTranslationRepository");
let VariantTranslationService = class VariantTranslationService {
    constructor(variantTranslationRepository) {
        this.variantTranslationRepository = variantTranslationRepository;
        // --
    }
    save(variantTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.variantTranslationRepository.repository.save(variantTranslation);
        });
    }
    findOne(data) {
        return this.variantTranslationRepository.repository.findOne(data);
    }
    find(data) {
        return this.variantTranslationRepository.repository.find(data);
    }
};
exports.VariantTranslationService = VariantTranslationService;
exports.VariantTranslationService = VariantTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [VariantTranslationRepository_1.VariantTranslationRepository])
], VariantTranslationService);
//# sourceMappingURL=VariantTranslationService.js.map