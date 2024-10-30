"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFullfillmentStatus = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
let OrderFullfillmentStatus = class OrderFullfillmentStatus extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], OrderFullfillmentStatus.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], OrderFullfillmentStatus.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], OrderFullfillmentStatus.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'priority' }),
    tslib_1.__metadata("design:type", Number)
], OrderFullfillmentStatus.prototype, "priority", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_status' }),
    tslib_1.__metadata("design:type", Number)
], OrderFullfillmentStatus.prototype, "defaultStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_admin' }),
    tslib_1.__metadata("design:type", Number)
], OrderFullfillmentStatus.prototype, "isAdmin", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_vendor' }),
    tslib_1.__metadata("design:type", Number)
], OrderFullfillmentStatus.prototype, "isVendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_buyer' }),
    tslib_1.__metadata("design:type", Number)
], OrderFullfillmentStatus.prototype, "isBuyer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_api' }),
    tslib_1.__metadata("design:type", Number)
], OrderFullfillmentStatus.prototype, "isApi", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'color_code' }),
    tslib_1.__metadata("design:type", String)
], OrderFullfillmentStatus.prototype, "colorCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderFullfillmentStatus.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderFullfillmentStatus.prototype, "updateDetails", null);
OrderFullfillmentStatus = tslib_1.__decorate([
    (0, typeorm_1.Entity)('order_fulfillment_status')
], OrderFullfillmentStatus);
exports.OrderFullfillmentStatus = OrderFullfillmentStatus;
//# sourceMappingURL=OrderFullfillmentStatus.js.map