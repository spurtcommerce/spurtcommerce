"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryLocationRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateDeliveryLocationRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(6, {
        message: 'pincode should be max 6 digit',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateDeliveryLocationRequest.prototype, "zipCode", void 0);
exports.CreateDeliveryLocationRequest = CreateDeliveryLocationRequest;
//# sourceMappingURL=CreateDeliveryLocationRequest.js.map