"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroup = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const Vendor_1 = require("./Vendor");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
const VendorGroupCategory_1 = require("./VendorGroupCategory");
let VendorGroup = class VendorGroup extends BaseModel_1.BaseModel {
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
], VendorGroup.prototype, "groupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], VendorGroup.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], VendorGroup.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_group_commission' }),
    tslib_1.__metadata("design:type", Number)
], VendorGroup.prototype, "commission", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorGroup.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => Vendor_1.Vendor, vendor => vendor.vendorGroup),
    tslib_1.__metadata("design:type", Array)
], VendorGroup.prototype, "vendor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorGroupCategory_1.VendorGroupCategory, vendorGroupCategory => vendorGroupCategory.vendorGroup),
    tslib_1.__metadata("design:type", Array)
], VendorGroup.prototype, "vendorGroupCategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroup.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorGroup.prototype, "updateDetails", null);
VendorGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_group')
], VendorGroup);
exports.VendorGroup = VendorGroup;
//# sourceMappingURL=VendorGroup.js.map