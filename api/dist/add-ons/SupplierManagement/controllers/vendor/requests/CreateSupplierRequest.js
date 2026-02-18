"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSupplierRequest = void 0;
const tslib_1 = require("tslib");
/* tslint:disable:max-classes-per-file */
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class CreateSupplierRequest {
}
exports.CreateSupplierRequest = CreateSupplierRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'supplierName is required' }),
    tslib_1.__metadata("design:type", String)
], CreateSupplierRequest.prototype, "supplierName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'countryId is required' }),
    tslib_1.__metadata("design:type", Number)
], CreateSupplierRequest.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'categoryId is required' }),
    tslib_1.__metadata("design:type", Number)
], CreateSupplierRequest.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'mobile is required' }),
    tslib_1.__metadata("design:type", String)
], CreateSupplierRequest.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'contactDetail is required' }),
    tslib_1.__metadata("design:type", Array)
], CreateSupplierRequest.prototype, "contactDetail", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'uploadDetail is required' }),
    tslib_1.__metadata("design:type", Array)
], CreateSupplierRequest.prototype, "uploadDetail", void 0);
//# sourceMappingURL=CreateSupplierRequest.js.map