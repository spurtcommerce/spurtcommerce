"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentItems = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const VendorPayment_1 = require("./VendorPayment");
const VendorPaymentArchive_1 = require("./VendorPaymentArchive");
const Payment_1 = require("./Payment");
const OrderProduct_1 = require("./OrderProduct");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let PaymentItems = class PaymentItems extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'payment_item_id' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItems.prototype, "paymentItemId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItems.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'payment_id' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItems.prototype, "paymentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total_amount' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItems.prototype, "totalAmount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_name' }),
    tslib_1.__metadata("design:type", String)
], PaymentItems.prototype, "productName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_quantity' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItems.prototype, "productQuantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_price' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItems.prototype, "productPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorPayment_1.VendorPayment, vendorPayment => vendorPayment.paymentItems),
    tslib_1.__metadata("design:type", Array)
], PaymentItems.prototype, "vendorPayment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorPaymentArchive_1.VendorPaymentArchive, vendorPaymentArchive => vendorPaymentArchive.paymentItems),
    tslib_1.__metadata("design:type", Array)
], PaymentItems.prototype, "vendorPaymentArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.paymentItems),
    (0, typeorm_1.JoinColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", OrderProduct_1.OrderProduct)
], PaymentItems.prototype, "orderProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Payment_1.Payment, payment => payment.paymentItems),
    (0, typeorm_1.JoinColumn)({ name: 'payment_id' }),
    tslib_1.__metadata("design:type", Payment_1.Payment)
], PaymentItems.prototype, "payment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentItems.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentItems.prototype, "updateDetails", null);
PaymentItems = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payment_items')
], PaymentItems);
exports.PaymentItems = PaymentItems;
//# sourceMappingURL=PaymentItems.js.map