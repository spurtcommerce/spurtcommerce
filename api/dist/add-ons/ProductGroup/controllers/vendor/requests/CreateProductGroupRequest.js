"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductGroupRequest = exports.CreateProductGroupDetailRequest = void 0;
const tslib_1 = require("tslib");
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
/* tslint:disable:max-classes-per-file */
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateProductGroupDetailRequest {
}
exports.CreateProductGroupDetailRequest = CreateProductGroupDetailRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductGroupDetailRequest.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductGroupDetailRequest.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductGroupDetailRequest.prototype, "skuId", void 0);
class CreateProductGroupRequest {
}
exports.CreateProductGroupRequest = CreateProductGroupRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductGroupRequest.prototype, "parentProductId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateProductGroupDetailRequest),
    tslib_1.__metadata("design:type", Array)
], CreateProductGroupRequest.prototype, "productDetail", void 0);
//# sourceMappingURL=CreateProductGroupRequest.js.map