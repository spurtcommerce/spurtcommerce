"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalOrderTransaction = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../../src/api/core/models/BaseModel");
const moment = require("moment");
let PaypalOrderTransaction = class PaypalOrderTransaction extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'paypal_order_transaction_id' }),
    tslib_1.__metadata("design:type", Number)
], PaypalOrderTransaction.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'paypal_order_id' }),
    tslib_1.__metadata("design:type", Number)
], PaypalOrderTransaction.prototype, "paypalOrderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_type' }),
    tslib_1.__metadata("design:type", String)
], PaypalOrderTransaction.prototype, "paymentType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_data' }),
    tslib_1.__metadata("design:type", String)
], PaypalOrderTransaction.prototype, "paymentData", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_status' }),
    tslib_1.__metadata("design:type", Number)
], PaypalOrderTransaction.prototype, "paymentStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PaypalOrderTransaction.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PaypalOrderTransaction.prototype, "updateDetails", null);
PaypalOrderTransaction = tslib_1.__decorate([
    (0, typeorm_1.Entity)('paypal_order_transaction')
], PaypalOrderTransaction);
exports.PaypalOrderTransaction = PaypalOrderTransaction;
//# sourceMappingURL=PaypalOrderTransaction.js.map