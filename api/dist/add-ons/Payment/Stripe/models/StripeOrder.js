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
exports.StripeOrder = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../../src/api/core/models/BaseModel");
const moment = require("moment");
let StripeOrder = class StripeOrder extends BaseModel_1.BaseModel {
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
], StripeOrder.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], StripeOrder.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'stripe_ref_id' }),
    tslib_1.__metadata("design:type", String)
], StripeOrder.prototype, "stripeRefId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", String)
], StripeOrder.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'status' }),
    tslib_1.__metadata("design:type", Number)
], StripeOrder.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StripeOrder.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StripeOrder.prototype, "updateDetails", null);
StripeOrder = tslib_1.__decorate([
    (0, typeorm_1.Entity)('stripe_order')
], StripeOrder);
exports.StripeOrder = StripeOrder;
//# sourceMappingURL=StripeOrder.js.map