"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateUser {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)({}, {
        message: 'Please provide username as emailId',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'username is required',
    }),
    (0, class_validator_1.MaxLength)(96, {
        message: 'username should be maximum 96 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'password must contain minimum 8 character',
    }),
    (0, class_validator_1.Matches)(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'password is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'First name is maximum 32 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'First name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'Last name is maximum 32 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Last name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'email should be maximum 96 character',
    }),
    (0, class_validator_1.IsEmail)({}, {
        message: 'Please provide valid email Id',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email - Id is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'User Group Id is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateUser.prototype, "userGroupId", void 0);
exports.CreateUser = CreateUser;
//# sourceMappingURL=CreateUserRequest.js.map