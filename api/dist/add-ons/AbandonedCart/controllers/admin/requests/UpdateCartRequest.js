"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class UpdateCartRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'CustomerId is Required',
    }),
    tslib_1.__metadata("design:type", Array)
], UpdateCartRequest.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Action Type is Required',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateCartRequest.prototype, "action", void 0);
exports.UpdateCartRequest = UpdateCartRequest;
//# sourceMappingURL=UpdateCartRequest.js.map