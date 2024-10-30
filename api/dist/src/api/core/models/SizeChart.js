"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeChart = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const SizeChartTemplate_1 = require("./SizeChartTemplate");
const moment = require("moment/moment");
const SizeChartHeader_1 = require("./SizeChartHeader");
const class_validator_1 = require("class-validator");
let SizeChart = class SizeChart extends BaseModel_1.BaseModel {
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
], SizeChart.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], SizeChart.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], SizeChart.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], SizeChart.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], SizeChart.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'template_id' }),
    tslib_1.__metadata("design:type", Number)
], SizeChart.prototype, "templateId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => SizeChartTemplate_1.SizeChartTemplate, sizeChartTemplate => sizeChartTemplate.sizeChart),
    (0, typeorm_1.JoinColumn)({ name: 'template_id' }),
    tslib_1.__metadata("design:type", Array)
], SizeChart.prototype, "sizeChartTemplate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => SizeChartHeader_1.SizeChartHeader, sizeChartHeader => sizeChartHeader.sizeChart),
    tslib_1.__metadata("design:type", Array)
], SizeChart.prototype, "sizeChartHeader", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SizeChart.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SizeChart.prototype, "updateDetails", null);
SizeChart = tslib_1.__decorate([
    (0, typeorm_1.Entity)('size_chart')
], SizeChart);
exports.SizeChart = SizeChart;
//# sourceMappingURL=SizeChart.js.map