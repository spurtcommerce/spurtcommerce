"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMessageRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class TicketMessageRequest {
}
exports.TicketMessageRequest = TicketMessageRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Message is required',
    }),
    tslib_1.__metadata("design:type", String)
], TicketMessageRequest.prototype, "message", void 0);
//# sourceMappingURL=TicketMessageRequest.js.map