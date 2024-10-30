"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class EditProfileRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'username is maximum 96 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'username is required',
    }),
    tslib_1.__metadata("design:type", String)
], EditProfileRequest.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'email is maximum 96 character',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], EditProfileRequest.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(15, {
        message: 'phonenumber is maximum 15 character',
    }),
    tslib_1.__metadata("design:type", String)
], EditProfileRequest.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'address is maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], EditProfileRequest.prototype, "address", void 0);
exports.EditProfileRequest = EditProfileRequest;
//# sourceMappingURL=EditProfileRequest.js.map