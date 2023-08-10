"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProduct = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const Order_1 = require("../models/Order");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductModel_1 = require("./ProductModel");
const OrderProductLog_1 = require("./OrderProductLog");
const PaymentItems_1 = require("./PaymentItems");
const PaymentItemsArchive_1 = require("./PaymentItemsArchive");
const class_validator_1 = require("class-validator");
const OrderStatus_1 = require("./OrderStatus");
let OrderProduct = class OrderProduct extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_product_prefix_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "orderProductPrefixId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'model' }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "model", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_price' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "productPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "discountAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'base_price' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "basePrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tax_type' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "taxType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tax_value' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "taxValue", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'discounted_amount' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "discountedAmount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "orderStatusId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_url' }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "trackingUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_no' }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "trackingNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'trace' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "trace", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tax' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "tax", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'cancel_request' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "cancelRequest", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'cancel_request_status' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "cancelRequestStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'cancel_reason' }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "cancelReason", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'cancel_reason_description' }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "cancelReasonDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sku_name' }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "skuName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_discount_amount' }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "couponDiscountAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductModel_1.Product, product => product.orderProduct),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], OrderProduct.prototype, "productInformationDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Order_1.Order, order => order.productlist),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Order_1.Order)
], OrderProduct.prototype, "product", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Order_1.Order, order => order.orderProduct),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Order_1.Order)
], OrderProduct.prototype, "order", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => OrderStatus_1.OrderStatus),
    (0, typeorm_1.JoinColumn)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", OrderStatus_1.OrderStatus)
], OrderProduct.prototype, "orderStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => OrderProductLog_1.OrderProductLog, orderProductLog => orderProductLog.orderProduct),
    tslib_1.__metadata("design:type", Array)
], OrderProduct.prototype, "orderProductLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => PaymentItems_1.PaymentItems, paymentItems => paymentItems.orderProduct),
    tslib_1.__metadata("design:type", Array)
], OrderProduct.prototype, "paymentItems", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => PaymentItemsArchive_1.PaymentItemsArchive, paymentItemsArchive => paymentItemsArchive.orderProduct),
    tslib_1.__metadata("design:type", Array)
], OrderProduct.prototype, "paymentItemsArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderProduct.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderProduct.prototype, "updateDetails", null);
OrderProduct = tslib_1.__decorate([
    (0, typeorm_1.Entity)('order_product')
], OrderProduct);
exports.OrderProduct = OrderProduct;
//# sourceMappingURL=OrderProduct.js.map