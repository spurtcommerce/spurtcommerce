"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeChartTemplate = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const SizeChartTemplateHeader_1 = require("./SizeChartTemplateHeader");
const moment = require("moment/moment");
const SizeChart_1 = require("./SizeChart");
const class_validator_1 = require("class-validator");
let SizeChartTemplate = class SizeChartTemplate extends BaseModel_1.BaseModel {
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
], SizeChartTemplate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'template_name' }),
    tslib_1.__metadata("design:type", String)
], SizeChartTemplate.prototype, "templateName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => SizeChartTemplateHeader_1.SizeChartTemplateHeader, sizeChartTemplateHeader => sizeChartTemplateHeader.sizeChartTemplate),
    tslib_1.__metadata("design:type", Array)
], SizeChartTemplate.prototype, "templateHeader", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => SizeChart_1.SizeChart, sizeChart => sizeChart.sizeChartTemplate),
    tslib_1.__metadata("design:type", Array)
], SizeChartTemplate.prototype, "sizeChart", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SizeChartTemplate.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SizeChartTemplate.prototype, "updateDetails", null);
SizeChartTemplate = tslib_1.__decorate([
    (0, typeorm_1.Entity)('size_chart_template')
], SizeChartTemplate);
exports.SizeChartTemplate = SizeChartTemplate;
//# sourceMappingURL=SizeChartTemplate.js.map