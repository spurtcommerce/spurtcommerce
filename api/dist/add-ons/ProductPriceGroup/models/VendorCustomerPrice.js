"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCustomerPrice = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const VendorPriceGroup_1 = require("./VendorPriceGroup");
const Customer_1 = require("../../../src/api/core/models/Customer");
let VendorCustomerPrice = class VendorCustomerPrice extends BaseModel_1.BaseModel {
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
exports.VendorCustomerPrice = VendorCustomerPrice;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerPrice.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'price_group_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerPrice.prototype, "priceGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerPrice.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerPrice.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], VendorCustomerPrice.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => VendorPriceGroup_1.VendorPriceGroup, vendorPriceGroup => vendorPriceGroup.vendorCustomerPrice),
    (0, typeorm_1.JoinColumn)({ name: 'price_group_id' }),
    tslib_1.__metadata("design:type", VendorPriceGroup_1.VendorPriceGroup)
], VendorCustomerPrice.prototype, "vendorPriceGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => Customer_1.Customer, customer => customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], VendorCustomerPrice.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerPrice.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorCustomerPrice.prototype, "updateDetails", null);
exports.VendorCustomerPrice = VendorCustomerPrice = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_customer_price')
], VendorCustomerPrice);
//# sourceMappingURL=VendorCustomerPrice.js.map