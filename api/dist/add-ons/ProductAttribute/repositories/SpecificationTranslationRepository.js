"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationTranslationRepository = void 0;
const tslib_1 = require("tslib");
const SpecificationTranslation_1 = require("../models/SpecificationTranslation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let SpecificationTranslationRepository = class SpecificationTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SpecificationTranslation_1.SpecificationTranslation);
    }
};
exports.SpecificationTranslationRepository = SpecificationTranslationRepository;
exports.SpecificationTranslationRepository = SpecificationTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SpecificationTranslationRepository);
//# sourceMappingURL=SpecificationTranslationRepository.js.map