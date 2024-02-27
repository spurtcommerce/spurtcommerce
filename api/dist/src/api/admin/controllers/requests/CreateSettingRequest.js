"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettingRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class CreateSettingRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'siteUrl is Required..!',
    }),
    tslib_1.__metadata("design:type", String)
], CreateSettingRequest.prototype, "siteUrl", void 0);
exports.CreateSettingRequest = CreateSettingRequest;
//# sourceMappingURL=CreateSettingRequest.js.map