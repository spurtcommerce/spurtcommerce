"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupDetail = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const VendorPriceGroup_1 = require("./VendorPriceGroup");
const VendorPriceGroupSchedule_1 = require("./VendorPriceGroupSchedule");
const SkuModel_1 = require("../../../src/api/core/models/SkuModel");
let VendorPriceGroupDetail = class VendorPriceGroupDetail extends BaseModel_1.BaseModel {
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
exports.VendorPriceGroupDetail = VendorPriceGroupDetail;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'price_group_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "priceGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sku_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "skuId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'max_qty' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "maxQuantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'price' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "price", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'unit_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "unitId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_default' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "isDefault", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupDetail.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => SkuModel_1.Sku, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'sku_id' }),
    tslib_1.__metadata("design:type", SkuModel_1.Sku)
], VendorPriceGroupDetail.prototype, "skuDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => VendorPriceGroup_1.VendorPriceGroup, vendorPriceGroup => vendorPriceGroup.vendorPriceGroupDetail),
    (0, typeorm_1.JoinColumn)({ name: 'price_group_id' }),
    tslib_1.__metadata("design:type", VendorPriceGroup_1.VendorPriceGroup)
], VendorPriceGroupDetail.prototype, "vendorPriceGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => VendorPriceGroupSchedule_1.VendorPriceGroupSchedule, vendorPriceGroupSchedule => vendorPriceGroupSchedule.vendorPriceGroupDetail, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], VendorPriceGroupDetail.prototype, "vendorPriceGroupSchedule", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupDetail.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupDetail.prototype, "updateDetails", null);
exports.VendorPriceGroupDetail = VendorPriceGroupDetail = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_price_group_detail')
], VendorPriceGroupDetail);
//# sourceMappingURL=VendorPriceGroupDetail.js.map