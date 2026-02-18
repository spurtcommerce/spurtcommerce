"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupSchedule = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const VendorPriceGroupDetail_1 = require("./VendorPriceGroupDetail");
let VendorPriceGroupSchedule = class VendorPriceGroupSchedule extends BaseModel_1.BaseModel {
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
exports.VendorPriceGroupSchedule = VendorPriceGroupSchedule;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupSchedule.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'price_group_detail_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupSchedule.prototype, "priceGroupDetailId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    tslib_1.__metadata("design:type", String)
], VendorPriceGroupSchedule.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'end_date' }),
    tslib_1.__metadata("design:type", String)
], VendorPriceGroupSchedule.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupSchedule.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], VendorPriceGroupSchedule.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => VendorPriceGroupDetail_1.VendorPriceGroupDetail, vendorPriceGroupDetail => vendorPriceGroupDetail.vendorPriceGroupSchedule),
    (0, typeorm_1.JoinColumn)({ name: 'price_group_detail_id' }),
    tslib_1.__metadata("design:type", VendorPriceGroupDetail_1.VendorPriceGroupDetail)
], VendorPriceGroupSchedule.prototype, "vendorPriceGroupDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupSchedule.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupSchedule.prototype, "updateDetails", null);
exports.VendorPriceGroupSchedule = VendorPriceGroupSchedule = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_price_group_schedule')
], VendorPriceGroupSchedule);
//# sourceMappingURL=VendorPriceGroupSchedule.js.map