"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPaymentRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class AddPaymentRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AddPaymentRequest.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AddPaymentRequest.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'paymentRefId should be maximum 255 character',
    }),
    (0, class_validator_1.ValidateIf)(o => o.paymentRefId !== ''),
    tslib_1.__metadata("design:type", String)
], AddPaymentRequest.prototype, "paymentRefId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AddPaymentRequest.prototype, "paymentStatus", void 0);
exports.AddPaymentRequest = AddPaymentRequest;
//# sourceMappingURL=AddPaymentRequest.js.map