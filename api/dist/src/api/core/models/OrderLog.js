"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLog = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const OrderProduct_1 = require("./OrderProduct");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let OrderLog = class OrderLog extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'order_log_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "orderLogId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "currencyId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_zone_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "shippingZoneId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_zone_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "paymentZoneId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_country_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "shippingCountryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_country_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "paymentCountryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_no' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "invoiceNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_prefix' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "invoicePrefix", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_prefix_id' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "orderPrefixId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'firstname' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'lastname' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'telephone' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "telephone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'fax' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "fax", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'shipping_firstname' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingFirstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_lastname' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingLastname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_company' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingCompany", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_address_1' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingAddress1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_address_2' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingAddress2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_city' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingCity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_postcode' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingPostcode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_country' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingCountry", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_zone' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingZone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_address_format' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingAddressFormat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_method' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "shippingMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_firstname' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentFirstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_lastname' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentLastname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_company' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentCompany", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_address_1' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentAddress1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_address_2' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentAddress2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_city' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentCity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_postcode' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentPostcode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_country' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentCountry", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_zone' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentZone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_address_format' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentAddressFormat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'comment' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reward' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "reward", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "orderStatusId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'affiliate_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "affiliateId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'commision' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "commision", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_code' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "currencyCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_value' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "currencyValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'ip' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "ip", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_flag' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "paymentFlag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_name' }),
    tslib_1.__metadata("design:type", String)
], OrderLog.prototype, "orderName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], OrderLog.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.product),
    tslib_1.__metadata("design:type", Array)
], OrderLog.prototype, "productlist", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderLog.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderLog.prototype, "updateDetails", null);
OrderLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('order_log')
], OrderLog);
exports.OrderLog = OrderLog;
//# sourceMappingURL=OrderLog.js.map