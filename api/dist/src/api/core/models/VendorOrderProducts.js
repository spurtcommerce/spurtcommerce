"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderProducts = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const class_transformer_1 = require("class-transformer");
const VendorOrders_1 = require("./VendorOrders");
const OrderProduct_1 = require("./OrderProduct");
const class_validator_1 = require("class-validator");
let VendorOrderProducts = class VendorOrderProducts extends BaseModel_1.BaseModel {
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
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderProducts.prototype, "vendorOrderProductId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderProducts.prototype, "vendorOrderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderProducts.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => VendorOrders_1.VendorOrders, vendorOrders => vendorOrders.vendororderproducts),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrderProducts.prototype, "vendororder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.vendororderproduct),
    (0, typeorm_1.JoinColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrderProducts.prototype, "orderproduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderProducts.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderProducts.prototype, "updateDetails", null);
VendorOrderProducts = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_order_products')
], VendorOrderProducts);
exports.VendorOrderProducts = VendorOrderProducts;
//# sourceMappingURL=VendorOrderProducts.js.map