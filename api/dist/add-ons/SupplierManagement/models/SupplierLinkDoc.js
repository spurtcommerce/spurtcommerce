"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierLinkDoc = exports.UploadType = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const Supplier_1 = require("./Supplier");
var UploadType;
(function (UploadType) {
    UploadType[UploadType["document"] = 1] = "document";
    UploadType[UploadType["link"] = 2] = "link";
})(UploadType || (exports.UploadType = UploadType = {}));
let SupplierLinkDoc = class SupplierLinkDoc extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
exports.SupplierLinkDoc = SupplierLinkDoc;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SupplierLinkDoc.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_id' }),
    tslib_1.__metadata("design:type", Number)
], SupplierLinkDoc.prototype, "supplierId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'document_id' }),
    tslib_1.__metadata("design:type", Number)
], SupplierLinkDoc.prototype, "documentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], SupplierLinkDoc.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_path' }),
    tslib_1.__metadata("design:type", String)
], SupplierLinkDoc.prototype, "filePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    tslib_1.__metadata("design:type", String)
], SupplierLinkDoc.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'link' }),
    tslib_1.__metadata("design:type", String)
], SupplierLinkDoc.prototype, "link", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_approved' }),
    tslib_1.__metadata("design:type", Number)
], SupplierLinkDoc.prototype, "isApproved", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], SupplierLinkDoc.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], SupplierLinkDoc.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'upload_type', type: 'enum', enum: UploadType }),
    tslib_1.__metadata("design:type", Number)
], SupplierLinkDoc.prototype, "UploadType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Supplier_1.Supplier, supplier => supplier.supplierLinkDoc),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id' }),
    tslib_1.__metadata("design:type", Supplier_1.Supplier)
], SupplierLinkDoc.prototype, "supplier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierLinkDoc.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierLinkDoc.prototype, "updateDetails", null);
exports.SupplierLinkDoc = SupplierLinkDoc = tslib_1.__decorate([
    (0, typeorm_1.Entity)('supplier_link_doc')
], SupplierLinkDoc);
//# sourceMappingURL=SupplierLinkDoc.js.map