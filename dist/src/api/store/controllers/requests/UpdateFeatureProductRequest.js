"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFeatureProduct = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateFeatureProduct {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'isFeature is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateFeatureProduct.prototype, "isFeature", void 0);
exports.UpdateFeatureProduct = UpdateFeatureProduct;
//# sourceMappingURL=UpdateFeatureProductRequest.js.map