"use strict";
/*
 * spurtcommerce API
 * version 4.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderText = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const SizeChartTemplateHeader_1 = require("./SizeChartTemplateHeader");
let HeaderText = class HeaderText {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], HeaderText.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'header_text' }),
    tslib_1.__metadata("design:type", String)
], HeaderText.prototype, "headerText", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => SizeChartTemplateHeader_1.SizeChartTemplateHeader, sizeChartTemplateHeader => sizeChartTemplateHeader.sizeChartTemplate),
    tslib_1.__metadata("design:type", Array)
], HeaderText.prototype, "templateHeader", void 0);
HeaderText = tslib_1.__decorate([
    (0, typeorm_1.Entity)('header_text')
], HeaderText);
exports.HeaderText = HeaderText;
//# sourceMappingURL=HeaderTextModel.js.map