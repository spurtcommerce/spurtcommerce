"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayOrder = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../../src/api/core/models/BaseModel");
const moment = require("moment");
let RazorpayOrder = class RazorpayOrder extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], RazorpayOrder.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], RazorpayOrder.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'razorpay_reference_id' }),
    tslib_1.__metadata("design:type", String)
], RazorpayOrder.prototype, "razorpayRefId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", String)
], RazorpayOrder.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'status' }),
    tslib_1.__metadata("design:type", Number)
], RazorpayOrder.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RazorpayOrder.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RazorpayOrder.prototype, "updateDetails", null);
RazorpayOrder = tslib_1.__decorate([
    (0, typeorm_1.Entity)('razorpay_order')
], RazorpayOrder);
exports.RazorpayOrder = RazorpayOrder;
//# sourceMappingURL=RazorpayOrder.js.map