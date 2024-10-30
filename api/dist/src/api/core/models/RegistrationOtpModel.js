"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationOtp = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let RegistrationOtp = class RegistrationOtp extends BaseModel_1.BaseModel {
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'otp_id' }),
    tslib_1.__metadata("design:type", Number)
], RegistrationOtp.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'email_id' }),
    tslib_1.__metadata("design:type", String)
], RegistrationOtp.prototype, "emailId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'otp' }),
    tslib_1.__metadata("design:type", Number)
], RegistrationOtp.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_type' }),
    tslib_1.__metadata("design:type", Number)
], RegistrationOtp.prototype, "userType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], RegistrationOtp.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], RegistrationOtp.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RegistrationOtp.prototype, "updateDetails", null);
RegistrationOtp = tslib_1.__decorate([
    (0, typeorm_1.Entity)('registration_user_otp')
], RegistrationOtp);
exports.RegistrationOtp = RegistrationOtp;
//# sourceMappingURL=RegistrationOtpModel.js.map