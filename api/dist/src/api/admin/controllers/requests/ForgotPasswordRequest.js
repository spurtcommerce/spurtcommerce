"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassword = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class ForgotPassword {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'email is maximum 96 character',
    }),
    (0, class_validator_1.MinLength)(4, {
        message: 'email is minimum 4 character',
    }),
    tslib_1.__metadata("design:type", String)
], ForgotPassword.prototype, "email", void 0);
exports.ForgotPassword = ForgotPassword;
//# sourceMappingURL=ForgotPasswordRequest.js.map