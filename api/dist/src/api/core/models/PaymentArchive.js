"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentArchive = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const PaymentItemsArchive_1 = require("./PaymentItemsArchive");
const Order_1 = require("./Order");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let PaymentArchive = class PaymentArchive extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'payment_archive_id' }),
    tslib_1.__metadata("design:type", Number)
], PaymentArchive.prototype, "paymentArchiveId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], PaymentArchive.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'paid_date' }),
    tslib_1.__metadata("design:type", String)
], PaymentArchive.prototype, "paidDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_number' }),
    tslib_1.__metadata("design:type", Number)
], PaymentArchive.prototype, "paymentNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_information' }),
    tslib_1.__metadata("design:type", String)
], PaymentArchive.prototype, "paymentInformation", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'payment_amount' }),
    tslib_1.__metadata("design:type", Number)
], PaymentArchive.prototype, "paymentAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_commission_amount' }),
    tslib_1.__metadata("design:type", Number)
], PaymentArchive.prototype, "paymentCommissionAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => PaymentItemsArchive_1.PaymentItemsArchive, paymentItemsArchive => paymentItemsArchive.paymentArchive),
    tslib_1.__metadata("design:type", Array)
], PaymentArchive.prototype, "paymentItemsArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Order_1.Order),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Order_1.Order)
], PaymentArchive.prototype, "orderDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentArchive.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentArchive.prototype, "updateDetails", null);
PaymentArchive = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payment_archive')
], PaymentArchive);
exports.PaymentArchive = PaymentArchive;
//# sourceMappingURL=PaymentArchive.js.map