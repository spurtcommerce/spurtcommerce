"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCurrency = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateCurrency {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(30, {
        message: 'title should be maximum 30 characters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCurrency.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(4, {
        message: 'code should be maximum 4 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateCurrency.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(4, {
        message: 'symbolLeft should be maximum 4 characters',
    }),
    (0, class_validator_1.ValidateIf)(o => o.symbolLeft !== null),
    tslib_1.__metadata("design:type", String)
], CreateCurrency.prototype, "symbolLeft", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(4, {
        message: 'symbolRight should be maximum 4 characters',
    }),
    (0, class_validator_1.ValidateIf)(o => o.symbolRight !== null),
    tslib_1.__metadata("design:type", String)
], CreateCurrency.prototype, "symbolRight", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateCurrency.prototype, "status", void 0);
exports.CreateCurrency = CreateCurrency;
//# sourceMappingURL=CreateCurrencyRequest.js.map