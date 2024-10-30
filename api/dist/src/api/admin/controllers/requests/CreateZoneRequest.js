"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateZone = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateZone {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateZone.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(30, {
        message: 'code should be maximum 30 character',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateZone.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'name should be maximum 128 character',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateZone.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateZone.prototype, "status", void 0);
exports.CreateZone = CreateZone;
//# sourceMappingURL=CreateZoneRequest.js.map