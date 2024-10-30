"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const OrderProduct_1 = require("./OrderProduct");
const VendorOrders_1 = require("./VendorOrders");
const VendorOrderArchive_1 = require("./VendorOrderArchive");
const Customer_1 = require("./Customer");
const moment = require("moment");
const OrderStatus_1 = require("./OrderStatus");
const VendorOrderLog_1 = require("./VendorOrderLog");
const VendorOrderArchiveLog_1 = require("./VendorOrderArchiveLog");
const OrderProductLog_1 = require("./OrderProductLog");
const class_validator_1 = require("class-validator");
const BaseModel_1 = require("./BaseModel");
const VendorInvoice_1 = require("./VendorInvoice");
let Order = class Order extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "currencyId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_zone_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "shippingZoneId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_zone_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "paymentZoneId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_country_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "shippingCountryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_country_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "paymentCountryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_no' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "invoiceNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_prefix' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "invoicePrefix", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'firstname' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'lastname' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'telephone' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "telephone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'fax' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "fax", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_firstname' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingFirstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_lastname' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingLastname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_company' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingCompany", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'shipping_address_1' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingAddress1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_address_2' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingAddress2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_city' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingCity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_postcode' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingPostcode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_country' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingCountry", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_zone' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingZone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_address_format' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingAddressFormat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_method' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "shippingMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_firstname' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentFirstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_lastname' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentLastname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_company' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentCompany", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_address_1' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentAddress1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_address_2' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentAddress2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_city' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentCity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_postcode' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentPostcode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_country' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentCountry", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_zone' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentZone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_address_format' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentAddressFormat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'comment' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_code' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "couponCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "discountAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'amount' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reward' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "reward", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "orderStatusId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_prefix_id' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "orderPrefixId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'affiliate_id' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "affiliateId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'commision' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "commision", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_code' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "currencyCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_value' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "currencyValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_symbol_left' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "currencySymbolLeft", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_symbol_Right' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "currencySymbolRight", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'ip' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "ip", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_flag' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "paymentFlag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_status' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "paymentStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_url' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "trackingUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_no' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "trackingNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_name' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "orderName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_type' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_process' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "paymentProcess", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_details' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentDetails", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'back_orders' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "backOrders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_gst_no' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "customerGstNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_mobile_number' }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "paymentMobileNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderStatus_1.OrderStatus, orderStatus => orderStatus.statusOfOrder),
    (0, typeorm_1.JoinColumn)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", OrderStatus_1.OrderStatus)
], Order.prototype, "orderStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Customer_1.Customer, customer => customer.order),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], Order.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.product),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "productlist", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.order),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "orderProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrders_1.VendorOrders, vendorOrders => vendorOrders.order),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "vendorOrders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderLog_1.VendorOrderLog, vendorOrderLog => vendorOrderLog.order),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "vendororderlog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderArchive_1.VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.order),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "vendorOrderArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderArchiveLog_1.VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.order),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "vendorOrderArchiveLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => OrderProductLog_1.OrderProductLog, orderProductLog => orderProductLog.order),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "orderProductLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorInvoice_1.VendorInvoice, vendorInvoice => vendorInvoice.orderDetail),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "vendorInvoice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Order.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Order.prototype, "updateDetails", null);
Order = tslib_1.__decorate([
    (0, typeorm_1.Entity)('order')
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map