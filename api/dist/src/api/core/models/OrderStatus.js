"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
const Order_1 = require("./Order");
const VendorOrders_1 = require("./VendorOrders");
const VendorOrderArchive_1 = require("./VendorOrderArchive");
const OrderProductLog_1 = require("./OrderProductLog");
const VendorOrderArchiveLog_1 = require("./VendorOrderArchiveLog");
let OrderStatus = class OrderStatus extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "orderStatusId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], OrderStatus.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'priority' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "priority", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_status' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "defaultStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_admin' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "isAdmin", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_vendor' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "isVendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_buyer' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "isBuyer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_api' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatus.prototype, "isApi", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => Order_1.Order, order => order.orderStatus),
    tslib_1.__metadata("design:type", Array)
], OrderStatus.prototype, "statusOfOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrders_1.VendorOrders, vendorOrder => vendorOrder.orderStatus),
    tslib_1.__metadata("design:type", Array)
], OrderStatus.prototype, "vendorOrders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderArchive_1.VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.orderStatus),
    tslib_1.__metadata("design:type", Array)
], OrderStatus.prototype, "vendorOrderArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderArchiveLog_1.VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.orderStatus),
    tslib_1.__metadata("design:type", Array)
], OrderStatus.prototype, "vendorOrderArchiveLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'color_code' }),
    tslib_1.__metadata("design:type", String)
], OrderStatus.prototype, "colorCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => OrderProductLog_1.OrderProductLog, orderProductLog => orderProductLog.orderStatus),
    tslib_1.__metadata("design:type", Array)
], OrderStatus.prototype, "orderProductLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatus.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderStatus.prototype, "updateDetails", null);
OrderStatus = tslib_1.__decorate([
    (0, typeorm_1.Entity)('order_status')
], OrderStatus);
exports.OrderStatus = OrderStatus;
//# sourceMappingURL=OrderStatus.js.map