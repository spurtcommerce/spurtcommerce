"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroup = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
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
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerGroup.prototype, "groupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], CustomerGroup.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], CustomerGroup.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'color_code' }),
    tslib_1.__metadata("design:type", String)
], CustomerGroup.prototype, "colorCode", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], CustomerGroup.prototype, "isActive", void 0);
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