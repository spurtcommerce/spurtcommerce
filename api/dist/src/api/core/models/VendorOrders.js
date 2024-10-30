"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrders = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const Vendor_1 = require("./Vendor");
const Order_1 = require("./Order");
const OrderStatus_1 = require("./OrderStatus");
const VendorOrderProducts_1 = require("./VendorOrderProducts");
const OrderProduct_1 = require("./OrderProduct");
const VendorPayment_1 = require("./VendorPayment");
const class_validator_1 = require("class-validator");
let VendorOrders = class VendorOrders extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrders.prototype, "vendorOrderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sub_order_id' }),
    tslib_1.__metadata("design:type", String)
], VendorOrders.prototype, "subOrderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrders.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'sub_order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrders.prototype, "subOrderStatusId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrders.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrders.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrders.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'commission' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrders.prototype, "commission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_url' }),
    tslib_1.__metadata("design:type", String)
], VendorOrders.prototype, "trackingUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_no' }),
    tslib_1.__metadata("design:type", String)
], VendorOrders.prototype, "trackingNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'make_settlement' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrders.prototype, "makeSettlement", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Vendor_1.Vendor, vendor => vendor.vendororder),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrders.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.vendorOrders),
    (0, typeorm_1.JoinColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", OrderProduct_1.OrderProduct)
], VendorOrders.prototype, "orderProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderStatus_1.OrderStatus, orderStatus => orderStatus.vendorOrders),
    (0, typeorm_1.JoinColumn)({ name: 'sub_order_status_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrders.prototype, "orderStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Order_1.Order, order => order.vendorOrders),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrders.prototype, "order", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Order_1.Order),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Order_1.Order)
], VendorOrders.prototype, "orderDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => OrderProduct_1.OrderProduct),
    (0, typeorm_1.JoinColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", OrderProduct_1.OrderProduct)
], VendorOrders.prototype, "orderProductDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderProducts_1.VendorOrderProducts, vendorOrderProducts => vendorOrderProducts.vendororder),
    tslib_1.__metadata("design:type", Array)
], VendorOrders.prototype, "vendororderproducts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorPayment_1.VendorPayment, vendorPayment => vendorPayment.vendorOrders),
    tslib_1.__metadata("design:type", Array)
], VendorOrders.prototype, "vendorPayment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrders.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrders.prototype, "updateDetails", null);
VendorOrders = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_orders')
], VendorOrders);
exports.VendorOrders = VendorOrders;
//# sourceMappingURL=VendorOrders.js.map