"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSeoRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class AddSeoRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(70, {
        message: 'metatagTitle should be maximum 70 characters',
    }),
    tslib_1.__metadata("design:type", String)
], AddSeoRequest.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(160, {
        message: 'metaTagDescription should be maximum 160 character',
    }),
    tslib_1.__metadata("design:type", String)
], AddSeoRequest.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], AddSeoRequest.prototype, "metaTagKeyword", void 0);
exports.AddSeoRequest = AddSeoRequest;
//# sourceMappingURL=CreateSeoRequest.js.map