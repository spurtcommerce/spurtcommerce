"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetItem = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const Widget_1 = require("./Widget");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let WidgetItem = class WidgetItem extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], WidgetItem.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'widget_id' }),
    tslib_1.__metadata("design:type", Number)
], WidgetItem.prototype, "widgetId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'ref_id' }),
    tslib_1.__metadata("design:type", Number)
], WidgetItem.prototype, "refId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Widget_1.Widget, widget => widget.widgetItem),
    (0, typeorm_1.JoinColumn)({ name: 'widget_id' }),
    tslib_1.__metadata("design:type", Widget_1.Widget)
], WidgetItem.prototype, "widget", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], WidgetItem.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], WidgetItem.prototype, "updateDetails", null);
WidgetItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('widget_item')
], WidgetItem);
exports.WidgetItem = WidgetItem;
//# sourceMappingURL=WidgetItem.js.map