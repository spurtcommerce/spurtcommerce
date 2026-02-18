"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCustomerGroupPrice = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const VendorPriceGroup_1 = require("./VendorPriceGroup");
const CustomerGroup_1 = require("../../../src/api/core/models/CustomerGroup");
let VendorCustomerGroupPrice = class VendorCustomerGroupPrice extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
exports.VendorCustomerGroupPrice = VendorCustomerGroupPrice;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerGroupPrice.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'price_group_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerGroupPrice.prototype, "priceGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_group_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerGroupPrice.prototype, "customerGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerGroupPrice.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerGroupPrice.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => VendorPriceGroup_1.VendorPriceGroup, vendorPriceGroup => vendorPriceGroup.vendorCustomerGroupPrice),
    (0, typeorm_1.JoinColumn)({ name: 'price_group_id' }),
    tslib_1.__metadata("design:type", VendorPriceGroup_1.VendorPriceGroup)
], VendorCustomerGroupPrice.prototype, "vendorPriceGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => CustomerGroup_1.CustomerGroup, customerGroup => customerGroup),
    (0, typeorm_1.JoinColumn)({ name: 'customer_group_id' }),
    tslib_1.__metadata("design:type", CustomerGroup_1.CustomerGroup)
], VendorCustomerGroupPrice.prototype, "customerGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupPrice.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerGroupPrice.prototype, "updateDetails", null);
exports.VendorCustomerGroupPrice = VendorCustomerGroupPrice = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_customer_group_price')
], VendorCustomerGroupPrice);
//# sourceMappingURL=VendorCustomerGroupPrice.js.map