"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeChartTemplateHeader = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const HeaderTextModel_1 = require("./HeaderTextModel");
const SizeChartTemplate_1 = require("./SizeChartTemplate");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let SizeChartTemplateHeader = class SizeChartTemplateHeader extends BaseModel_1.BaseModel {
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
], SizeChartTemplateHeader.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'template_id' }),
    tslib_1.__metadata("design:type", Number)
], SizeChartTemplateHeader.prototype, "templateId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'header_id' }),
    tslib_1.__metadata("design:type", Number)
], SizeChartTemplateHeader.prototype, "headerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'header_text' }),
    tslib_1.__metadata("design:type", String)
], SizeChartTemplateHeader.prototype, "headerText", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => HeaderTextModel_1.HeaderText, headerText => headerText.templateHeader),
    (0, typeorm_1.JoinColumn)({ name: 'header_id' }),
    tslib_1.__metadata("design:type", HeaderTextModel_1.HeaderText)
], SizeChartTemplateHeader.prototype, "header", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => SizeChartTemplate_1.SizeChartTemplate, sizeChartTemplate => sizeChartTemplate.templateHeader),
    (0, typeorm_1.JoinColumn)({ name: 'template_id' }),
    tslib_1.__metadata("design:type", SizeChartTemplate_1.SizeChartTemplate)
], SizeChartTemplateHeader.prototype, "sizeChartTemplate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SizeChartTemplateHeader.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SizeChartTemplateHeader.prototype, "updateDetails", null);
SizeChartTemplateHeader = tslib_1.__decorate([
    (0, typeorm_1.Entity)('size_chart_template_header')
], SizeChartTemplateHeader);
exports.SizeChartTemplateHeader = SizeChartTemplateHeader;
//# sourceMappingURL=SizeChartTemplateHeader.js.map