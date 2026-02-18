"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDeleteAccount = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
let CustomerDeleteAccount = class CustomerDeleteAccount extends BaseModel_1.BaseModel {
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
exports.CustomerDeleteAccount = CustomerDeleteAccount;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerDeleteAccount.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerDeleteAccount.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], CustomerDeleteAccount.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'otp' }),
    tslib_1.__metadata("design:type", Number)
], CustomerDeleteAccount.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 0, name: 'verify_otp_flag' }),
    tslib_1.__metadata("design:type", Number)
], CustomerDeleteAccount.prototype, "verifyOtpFlag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'enum', enum: ['approved', 'pending'] }),
    tslib_1.__metadata("design:type", String)
], CustomerDeleteAccount.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reason' }),
    tslib_1.__metadata("design:type", String)
], CustomerDeleteAccount.prototype, "reason", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'mail_otp_expire_time' }),
    tslib_1.__metadata("design:type", String)
], CustomerDeleteAccount.prototype, "mailOtpExpireTime", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerDeleteAccount.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerDeleteAccount.prototype, "updateDetails", null);
exports.CustomerDeleteAccount = CustomerDeleteAccount = tslib_1.__decorate([
    (0, typeorm_1.Entity)('customer_delete_account')
], CustomerDeleteAccount);
//# sourceMappingURL=CustomerDeleteAccount.js.map