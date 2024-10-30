"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let Currency = class Currency extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'currency_id' }),
    tslib_1.__metadata("design:type", Number)
], Currency.prototype, "currencyId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], Currency.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'code' }),
    tslib_1.__metadata("design:type", String)
], Currency.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'symbol_left' }),
    tslib_1.__metadata("design:type", String)
], Currency.prototype, "symbolLeft", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'symbol_right' }),
    tslib_1.__metadata("design:type", String)
], Currency.prototype, "symbolRight", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'decimal_place' }),
    tslib_1.__metadata("design:type", Number)
], Currency.prototype, "decimalPlace", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Currency.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Currency.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Currency.prototype, "updateDetails", null);
Currency = tslib_1.__decorate([
    (0, typeorm_1.Entity)('currency')
], Currency);
exports.Currency = Currency;
//# sourceMappingURL=Currency.js.map