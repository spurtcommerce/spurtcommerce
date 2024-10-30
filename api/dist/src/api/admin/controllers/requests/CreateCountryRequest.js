"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCountry = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateCountry {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(30, {
        message: 'name should be maximum 30 characters',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateCountry.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(2, {
        message: 'isoCode2 should be maximum 2 characters',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'isoCode2 is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateCountry.prototype, "isoCode2", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(3, {
        message: 'isoCode3 should be maximum 3 characters',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'isoCode3 is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateCountry.prototype, "isoCode3", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateCountry.prototype, "postcodeRequired", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateCountry.prototype, "status", void 0);
exports.CreateCountry = CreateCountry;
//# sourceMappingURL=CreateCountryRequest.js.map