"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const VendorCustomerPrice_1 = require("./VendorCustomerPrice");
const VendorPriceGroupDetail_1 = require("./VendorPriceGroupDetail");
const VendorCustomerGroupPrice_1 = require("./VendorCustomerGroupPrice");
let VendorPriceGroup = class VendorPriceGroup extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
exports.VendorPriceGroup = VendorPriceGroup;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroup.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], VendorPriceGroup.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'slug' }),
    tslib_1.__metadata("design:type", String)
], VendorPriceGroup.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], VendorPriceGroup.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroup.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroup.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_default' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroup.prototype, "isDefault", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => VendorCustomerPrice_1.VendorCustomerPrice, vendorCustomerPrice => vendorCustomerPrice.vendorPriceGroup),
    tslib_1.__metadata("design:type", Array)
], VendorPriceGroup.prototype, "vendorCustomerPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => VendorCustomerGroupPrice_1.VendorCustomerGroupPrice, vendorCustomerGroupPrice => vendorCustomerGroupPrice.vendorPriceGroup),
    tslib_1.__metadata("design:type", Array)
], VendorPriceGroup.prototype, "vendorCustomerGroupPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => VendorPriceGroupDetail_1.VendorPriceGroupDetail, vendorPriceGroupDetail => vendorPriceGroupDetail.vendorPriceGroup),
    tslib_1.__metadata("design:type", Array)
], VendorPriceGroup.prototype, "vendorPriceGroupDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroup.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroup.prototype, "updateDetails", null);
exports.VendorPriceGroup = VendorPriceGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_price_group')
], VendorPriceGroup);
//# sourceMappingURL=VendorPriceGroup.js.map