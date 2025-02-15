"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementItem = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const Settlement_1 = require("./Settlement");
const class_validator_1 = require("class-validator");
let SettlementItem = class SettlementItem extends BaseModel_1.BaseModel {
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
], SettlementItem.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], SettlementItem.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Number)
], SettlementItem.prototype, "vendorOrderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'settlement_id' }),
    tslib_1.__metadata("design:type", Number)
], SettlementItem.prototype, "settlementId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], SettlementItem.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], SettlementItem.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_product_prefix_id' }),
    tslib_1.__metadata("design:type", String)
], SettlementItem.prototype, "orderProductPrefixId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'total' }),
    tslib_1.__metadata("design:type", String)
], SettlementItem.prototype, "total", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'company_name' }),
    tslib_1.__metadata("design:type", String)
], SettlementItem.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'commission' }),
    tslib_1.__metadata("design:type", Number)
], SettlementItem.prototype, "commission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'commission_amount' }),
    tslib_1.__metadata("design:type", String)
], SettlementItem.prototype, "CommissionAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'net_amount' }),
    tslib_1.__metadata("design:type", String)
], SettlementItem.prototype, "netAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Settlement_1.Settlement, settlement => settlement.settlementItem),
    (0, typeorm_1.JoinColumn)({ name: 'settlement_id' }),
    tslib_1.__metadata("design:type", Settlement_1.Settlement)
], SettlementItem.prototype, "settlement", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementItem.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SettlementItem.prototype, "updateDetails", null);
SettlementItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('settlement_item')
], SettlementItem);
exports.SettlementItem = SettlementItem;
//# sourceMappingURL=SettlementItem.js.map