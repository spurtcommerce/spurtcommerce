"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settlement = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const SettlementItem_1 = require("./SettlementItem");
const class_validator_1 = require("class-validator");
let Settlement = class Settlement extends BaseModel_1.BaseModel {
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
], Settlement.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], Settlement.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'no_of_orders' }),
    tslib_1.__metadata("design:type", Number)
], Settlement.prototype, "noOfOrders", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'total_amount' }),
    tslib_1.__metadata("design:type", String)
], Settlement.prototype, "totalAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_symbol_left' }),
    tslib_1.__metadata("design:type", String)
], Settlement.prototype, "currencySymbolLeft", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_symbol_right' }),
    tslib_1.__metadata("design:type", String)
], Settlement.prototype, "currencySymbolRight", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => SettlementItem_1.SettlementItem, settlementItem => settlementItem.settlement),
    tslib_1.__metadata("design:type", Array)
], Settlement.prototype, "settlementItem", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Settlement.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Settlement.prototype, "updateDetails", null);
Settlement = tslib_1.__decorate([
    (0, typeorm_1.Entity)('settlement')
], Settlement);
exports.Settlement = Settlement;
//# sourceMappingURL=Settlement.js.map