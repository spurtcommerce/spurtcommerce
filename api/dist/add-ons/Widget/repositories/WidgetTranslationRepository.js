"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetTranslationRepository = void 0;
const tslib_1 = require("tslib");
const WidgetTranslation_1 = require("../models/WidgetTranslation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let WidgetTranslationRepository = class WidgetTranslationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(WidgetTranslation_1.WidgetTranslation);
    }
};
exports.WidgetTranslationRepository = WidgetTranslationRepository;
exports.WidgetTranslationRepository = WidgetTranslationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], WidgetTranslationRepository);
//# sourceMappingURL=WidgetTranslationRepository.js.map