"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderLog = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const Vendor_1 = require("./Vendor");
const Order_1 = require("./Order");
const class_validator_1 = require("class-validator");
let VendorOrderLog = class VendorOrderLog extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_order_log_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderLog.prototype, "vendorOrderLogId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderLog.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderLog.prototype, "vendorOrderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderLog.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sub_order_id' }),
    tslib_1.__metadata("design:type", String)
], VendorOrderLog.prototype, "subOrderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'sub_order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderLog.prototype, "subOrderStatusId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], VendorOrderLog.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Vendor_1.Vendor, vendor => vendor.vendororderlog),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrderLog.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Order_1.Order, order => order.vendororderlog),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Array)
], VendorOrderLog.prototype, "order", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderLog.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderLog.prototype, "updateDetails", null);
VendorOrderLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_orders_log')
], VendorOrderLog);
exports.VendorOrderLog = VendorOrderLog;
//# sourceMappingURL=VendorOrderLog.js.map