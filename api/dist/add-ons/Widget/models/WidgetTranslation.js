"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetTranslation = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const typeorm_1 = require("typeorm");
const Widget_1 = require("./Widget");
let WidgetTranslation = class WidgetTranslation extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
exports.WidgetTranslation = WidgetTranslation;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], WidgetTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'widget_title' }),
    tslib_1.__metadata("design:type", String)
], WidgetTranslation.prototype, "widgetTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'widget_long_title' }),
    tslib_1.__metadata("design:type", String)
], WidgetTranslation.prototype, "widgetLongTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'widget_description' }),
    tslib_1.__metadata("design:type", String)
], WidgetTranslation.prototype, "widgetDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'widget_id' }),
    tslib_1.__metadata("design:type", Number)
], WidgetTranslation.prototype, "widgetId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], WidgetTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_info', type: 'json' }),
    tslib_1.__metadata("design:type", Object)
], WidgetTranslation.prototype, "metaInfo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => Widget_1.Widget, widget => widget),
    (0, typeorm_1.JoinColumn)({ name: 'widget_id' }),
    tslib_1.__metadata("design:type", Widget_1.Widget)
], WidgetTranslation.prototype, "widget", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], WidgetTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], WidgetTranslation.prototype, "updateDetails", null);
exports.WidgetTranslation = WidgetTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('widget_translation')
], WidgetTranslation);
//# sourceMappingURL=WidgetTranslation.js.map