"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentItemsArchive = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const PaymentArchive_1 = require("./PaymentArchive");
const OrderProduct_1 = require("./OrderProduct");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let PaymentItemsArchive = class PaymentItemsArchive extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'payment_item_archive_id' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItemsArchive.prototype, "paymentItemArchiveId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItemsArchive.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_archive_id' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItemsArchive.prototype, "paymentArchiveId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total_amount' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItemsArchive.prototype, "totalAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_name' }),
    tslib_1.__metadata("design:type", String)
], PaymentItemsArchive.prototype, "productName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_quantity' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItemsArchive.prototype, "productQuantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_price' }),
    tslib_1.__metadata("design:type", Number)
], PaymentItemsArchive.prototype, "productPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.paymentItemsArchive),
    (0, typeorm_1.JoinColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", OrderProduct_1.OrderProduct)
], PaymentItemsArchive.prototype, "orderProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => PaymentArchive_1.PaymentArchive, paymentArchive => paymentArchive.paymentItemsArchive),
    (0, typeorm_1.JoinColumn)({ name: 'payment_archive_id' }),
    tslib_1.__metadata("design:type", PaymentArchive_1.PaymentArchive)
], PaymentItemsArchive.prototype, "paymentArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentItemsArchive.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentItemsArchive.prototype, "updateDetails", null);
PaymentItemsArchive = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payment_items_archive')
], PaymentItemsArchive);
exports.PaymentItemsArchive = PaymentItemsArchive;
//# sourceMappingURL=PaymentItemsArchive.js.map