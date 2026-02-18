"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSupplierRequest = void 0;
const tslib_1 = require("tslib");
/* tslint:disable:max-classes-per-file */
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateSupplierRequest {
}
exports.UpdateSupplierRequest = UpdateSupplierRequest;
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'name should be maximum 100 characters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateSupplierRequest.prototype, "supplierName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], UpdateSupplierRequest.prototype, "contactDetail", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], UpdateSupplierRequest.prototype, "uploadDetail", void 0);
//# sourceMappingURL=UpdateSupplierRequest.js.map