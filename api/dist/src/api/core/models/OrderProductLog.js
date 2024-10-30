"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductLog = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductModel_1 = require("./ProductModel");
const Order_1 = require("./Order");
const OrderStatus_1 = require("./OrderStatus");
const OrderProduct_1 = require("./OrderProduct");
const class_validator_1 = require("class-validator");
let OrderProductLog = class OrderProductLog extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'order_product_log_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "orderProductLogId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], OrderProductLog.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'model' }),
    tslib_1.__metadata("design:type", String)
], OrderProductLog.prototype, "model", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_price' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "productPrice", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "orderStatusId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_url' }),
    tslib_1.__metadata("design:type", String)
], OrderProductLog.prototype, "trackingUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_no' }),
    tslib_1.__metadata("design:type", String)
], OrderProductLog.prototype, "trackingNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'trace' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "trace", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tax' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "tax", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], OrderProductLog.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.orderProductLog),
    (0, typeorm_1.JoinColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", OrderProduct_1.OrderProduct)
], OrderProductLog.prototype, "orderProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductModel_1.Product, product => product.orderProductLog),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], OrderProductLog.prototype, "product", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Order_1.Order, order => order.orderProductLog),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Order_1.Order)
], OrderProductLog.prototype, "order", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderStatus_1.OrderStatus, orderStatus => orderStatus.orderProductLog),
    (0, typeorm_1.JoinColumn)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", OrderStatus_1.OrderStatus)
], OrderProductLog.prototype, "orderStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderProductLog.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderProductLog.prototype, "updateDetails", null);
OrderProductLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('order_product_log')
], OrderProductLog);
exports.OrderProductLog = OrderProductLog;
//# sourceMappingURL=OrderProductLog.js.map