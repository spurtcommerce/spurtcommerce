"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbuseReportRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class AbuseReportRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AbuseReportRequest.prototype, "reasonId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AbuseReportRequest.prototype, "answerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'remark should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], AbuseReportRequest.prototype, "remark", void 0);
exports.AbuseReportRequest = AbuseReportRequest;
//# sourceMappingURL=CreateReportAbuseRequest.js.map