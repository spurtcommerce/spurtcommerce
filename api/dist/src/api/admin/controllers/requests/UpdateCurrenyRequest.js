"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCurrency = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateCurrency {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateCurrency.prototype, "currencyId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(30, {
        message: 'title is maximum 30 character',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateCurrency.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(3, {
        message: 'code is maximum 3 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateCurrency.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(4, {
        message: 'symbolLeft should be maximum 4 characters',
    }),
    (0, class_validator_1.ValidateIf)(o => o.symbolLeft !== null),
    tslib_1.__metadata("design:type", String)
], UpdateCurrency.prototype, "symbolLeft", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(4, {
        message: 'symbolRight should be maximum 4 characters',
    }),
    (0, class_validator_1.ValidateIf)(o => o.symbolRight !== null),
    tslib_1.__metadata("design:type", String)
], UpdateCurrency.prototype, "symbolRight", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateCurrency.prototype, "status", void 0);
exports.UpdateCurrency = UpdateCurrency;
//# sourceMappingURL=UpdateCurrenyRequest.js.map