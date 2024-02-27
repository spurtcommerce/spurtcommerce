"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayOrderTransaction = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../../src/api/core/models/BaseModel");
const moment = require("moment");
let RazorpayOrderTransaction = class RazorpayOrderTransaction extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], RazorpayOrderTransaction.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'razorpay_order_id' }),
    tslib_1.__metadata("design:type", Number)
], RazorpayOrderTransaction.prototype, "razorpayOrderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_type' }),
    tslib_1.__metadata("design:type", String)
], RazorpayOrderTransaction.prototype, "paymentType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_data' }),
    tslib_1.__metadata("design:type", String)
], RazorpayOrderTransaction.prototype, "paymentData", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_status' }),
    tslib_1.__metadata("design:type", Number)
], RazorpayOrderTransaction.prototype, "paymentStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RazorpayOrderTransaction.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RazorpayOrderTransaction.prototype, "updateDetails", null);
RazorpayOrderTransaction = tslib_1.__decorate([
    (0, typeorm_1.Entity)('razorpay_order_transaction')
], RazorpayOrderTransaction);
exports.RazorpayOrderTransaction = RazorpayOrderTransaction;
//# sourceMappingURL=RazorpayOrderTransaction.js.map