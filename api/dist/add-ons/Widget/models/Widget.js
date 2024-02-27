"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const WidgetItem_1 = require("./WidgetItem");
const class_validator_1 = require("class-validator");
let Widget = class Widget extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'widget_id' }),
    tslib_1.__metadata("design:type", Number)
], Widget.prototype, "widgetId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'widget_title' }),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "widgetTitle", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'widget_link_type' }),
    tslib_1.__metadata("design:type", Number)
], Widget.prototype, "widgetLinkType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'widget_description' }),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "widgetDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'position' }),
    tslib_1.__metadata("design:type", Number)
], Widget.prototype, "position", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'show_home_page_widget' }),
    tslib_1.__metadata("design:type", Number)
], Widget.prototype, "ShowHomePageWidget", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_keyword' }),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'widget_slug_name' }),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "widgetSlugName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Widget.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => WidgetItem_1.WidgetItem, widgetItem => widgetItem.widget),
    tslib_1.__metadata("design:type", Array)
], Widget.prototype, "widgetItem", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Widget.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Widget.prototype, "updateDetails", null);
Widget = tslib_1.__decorate([
    (0, typeorm_1.Entity)('widget')
], Widget);
exports.Widget = Widget;
//# sourceMappingURL=Widget.js.map