"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class ChangePassword {
}
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(5, {
        message: 'Old Password is minimum 5 character',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ChangePassword.prototype, "oldPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'New Password should contain minimum 8 character',
    }),
    (0, class_validator_1.Matches)(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'password is required',
    }),
    tslib_1.__metadata("design:type", String)
], ChangePassword.prototype, "newPassword", void 0);
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=ChangePasswordRequest.js.map