"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Customer_1 = require("./Customer");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
let CustomerGroup = class CustomerGroup extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerGroup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], CustomerGroup.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], CustomerGroup.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'color_code' }),
    tslib_1.__metadata("design:type", String)
], CustomerGroup.prototype, "colorCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerGroup.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], CustomerGroup.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], CustomerGroup.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => Customer_1.Customer, customer => customer.customerGroup),
    tslib_1.__metadata("design:type", Array)
], CustomerGroup.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroup.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroup.prototype, "updateDetails", null);
CustomerGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('customer_group')
], CustomerGroup);
exports.CustomerGroup = CustomerGroup;
//# sourceMappingURL=CustomerGroup.js.map