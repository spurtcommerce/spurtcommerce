"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const WidgetTranslationRepository_1 = require("../repositories/WidgetTranslationRepository");
let WidgetTranslationService = class WidgetTranslationService {
    constructor(widgetTranslationRepository) {
        this.widgetTranslationRepository = widgetTranslationRepository;
        // --
    }
    save(widgetTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.widgetTranslationRepository.repository.save(widgetTranslation);
        });
    }
    bulkSave(widgetTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.widgetTranslationRepository.repository.save(widgetTranslation);
        });
    }
    findOne(condition) {
        return this.widgetTranslationRepository.repository.findOne(condition);
    }
    find(condition) {
        return this.widgetTranslationRepository.repository.find(condition);
    }
    delete(condition) {
        return this.widgetTranslationRepository.repository.delete(condition);
    }
};
exports.WidgetTranslationService = WidgetTranslationService;
exports.WidgetTranslationService = WidgetTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [WidgetTranslationRepository_1.WidgetTranslationRepository])
], WidgetTranslationService);
//# sourceMappingURL=WidgetTranslationService.js.map