"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailChangeOtp = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class EmailChangeOtp {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'OTP is required' }),
    tslib_1.__metadata("design:type", Number)
], EmailChangeOtp.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'mail id is required' }),
    tslib_1.__metadata("design:type", String)
], EmailChangeOtp.prototype, "emailId", void 0);
exports.EmailChangeOtp = EmailChangeOtp;
//# sourceMappingURL=EmailChangeOtpRequest.js.map