"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWidgetTranslationRequest = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class WidgetTranslationView {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], WidgetTranslationView.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], WidgetTranslationView.prototype, "widgetTitle", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], WidgetTranslationView.prototype, "widgetDescription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], WidgetTranslationView.prototype, "widgetLongTitle", void 0);
class CreateWidgetTranslationRequest {
}
exports.CreateWidgetTranslationRequest = CreateWidgetTranslationRequest;
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => WidgetTranslationView),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreateWidgetTranslationRequest.prototype, "widgetTranslation", void 0);
//# sourceMappingURL=CreateWidgetTranslationRequest.js.map