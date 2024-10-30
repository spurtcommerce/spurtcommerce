"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeChartHeader = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const SizeChart_1 = require("./SizeChart");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let SizeChartHeader = class SizeChartHeader extends BaseModel_1.BaseModel {
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
], SizeChartHeader.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'size_chart_id' }),
    tslib_1.__metadata("design:type", Number)
], SizeChartHeader.prototype, "sizeChartId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'header_text_value' }),
    tslib_1.__metadata("design:type", String)
], SizeChartHeader.prototype, "headerTextValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => SizeChart_1.SizeChart, sizeChart => sizeChart.sizeChartHeader),
    (0, typeorm_1.JoinColumn)({ name: 'size_chart_id' }),
    tslib_1.__metadata("design:type", SizeChart_1.SizeChart)
], SizeChartHeader.prototype, "sizeChart", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SizeChartHeader.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SizeChartHeader.prototype, "updateDetails", null);
SizeChartHeader = tslib_1.__decorate([
    (0, typeorm_1.Entity)('size_chart_header')
], SizeChartHeader);
exports.SizeChartHeader = SizeChartHeader;
//# sourceMappingURL=SizeChartHeader.js.map