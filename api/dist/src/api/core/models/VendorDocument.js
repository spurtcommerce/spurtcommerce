"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocument = exports.DocumentStatus = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Document_1 = require("./Document");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const VendorDocumentLog_1 = require("./VendorDocumentLog");
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus[DocumentStatus["Rejected"] = 0] = "Rejected";
    DocumentStatus[DocumentStatus["Approved"] = 1] = "Approved";
    DocumentStatus[DocumentStatus["Pending"] = 2] = "Pending";
})(DocumentStatus = exports.DocumentStatus || (exports.DocumentStatus = {}));
let VendorDocument = class VendorDocument extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocument.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocument.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'document_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocument.prototype, "documentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    tslib_1.__metadata("design:type", String)
], VendorDocument.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_path' }),
    tslib_1.__metadata("design:type", String)
], VendorDocument.prototype, "filePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'status' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocument.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_verified' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocument.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], VendorDocument.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'additional_info', type: 'json', default: {} }),
    tslib_1.__metadata("design:type", Object)
], VendorDocument.prototype, "additionalInfo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Document_1.Document, document => document.vendorDocument),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    tslib_1.__metadata("design:type", Document_1.Document)
], VendorDocument.prototype, "document", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorDocumentLog_1.VendorDocumentLog, vendorDocumentLog => vendorDocumentLog.vendorDocument),
    tslib_1.__metadata("design:type", Array)
], VendorDocument.prototype, "vendorDocumentLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocument.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VendorDocument.prototype, "updateDetails", null);
VendorDocument = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor_document')
], VendorDocument);
exports.VendorDocument = VendorDocument;
//# sourceMappingURL=VendorDocument.js.map