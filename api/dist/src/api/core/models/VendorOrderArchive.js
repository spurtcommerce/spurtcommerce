"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderArchive = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const Vendor_1 = require("./Vendor");
const Order_1 = require("./Order");
const OrderProduct_1 = require("./OrderProduct");
const OrderStatus_1 = require("./OrderStatus");
const VendorOrderArchiveLog_1 = require("./VendorOrderArchiveLog");
const class_validator_1 = require("class-validator");
let VendorOrderArchive = class VendorOrderArchive extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_order_archive_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderArchive.prototype, "vendorOrderArchiveId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sub_order_id' }),
    tslib_1.__metadata("design:type", String)
], VendorOrderArchive.prototype, "subOrderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderArchive.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'sub_order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderArchive.prototype, "subOrderStatusId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderArchive.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderArchive.prototype, "order_product_Id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'commission' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderArchive.prototype, "commission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderArchive.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Vendor_1.Vendor, vendor => vendor.vendorOrderArchive),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrderArchive.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.vendorOrderArchive),
    (0, typeorm_1.JoinColumn)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", OrderProduct_1.OrderProduct)
], VendorOrderArchive.prototype, "orderProduct", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => OrderStatus_1.OrderStatus, orderStatus => orderStatus.vendorOrderArchive),
    (0, typeorm_1.JoinColumn)({ name: 'sub_order_status_id' }),
    tslib_1.__metadata("design:type", OrderStatus_1.OrderStatus)
], VendorOrderArchive.prototype, "orderStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Order_1.Order, order => order.vendorOrderArchive),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrderArchive.prototype, "order", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderArchiveLog_1.VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.vendorOrderArchive),
    tslib_1.__metadata("design:type", Array)
], VendorOrderArchive.prototype, "vendorOrderArchiveLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderArchive.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderArchive.prototype, "updateDetails", null);
VendorOrderArchive = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_order_archive')
], VendorOrderArchive);
exports.VendorOrderArchive = VendorOrderArchive;
//# sourceMappingURL=VendorOrderArchive.js.map