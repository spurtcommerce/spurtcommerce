"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocumentLog = exports.DocumentLogStatus = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
var DocumentLogStatus;
(function (DocumentLogStatus) {
    DocumentLogStatus[DocumentLogStatus["Uploaded"] = 1] = "Uploaded";
    DocumentLogStatus[DocumentLogStatus["ReUploaded"] = 2] = "ReUploaded";
    DocumentLogStatus[DocumentLogStatus["Rejected"] = 3] = "Rejected";
    DocumentLogStatus[DocumentLogStatus["Approved"] = 4] = "Approved";
})(DocumentLogStatus = exports.DocumentLogStatus || (exports.DocumentLogStatus = {}));
let VendorDocumentLog = class VendorDocumentLog {
    createdDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocumentLog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'document_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocumentLog.prototype, "documentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'status' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocumentLog.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'reason' }),
    tslib_1.__metadata("design:type", String)
], VendorDocumentLog.prototype, "reason", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'created_date' }),
    tslib_1.__metadata("design:type", String)
], VendorDocumentLog.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocumentLog.prototype, "createdDetails", null);
VendorDocumentLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_document_log')
], VendorDocumentLog);
exports.VendorDocumentLog = VendorDocumentLog;
//# sourceMappingURL=VendorDocumentLogModel.js.map