"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorDocument_1 = require("./VendorDocument");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
let Document = class Document extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Document.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Document.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'document_type' }),
    tslib_1.__metadata("design:type", String)
], Document.prototype, "documentType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_mandatory' }),
    tslib_1.__metadata("design:type", Number)
], Document.prototype, "isMandatory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'max_upload_size' }),
    tslib_1.__metadata("design:type", Number)
], Document.prototype, "maxUploadSize", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Document.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], Document.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorDocument_1.VendorDocument, vendorDocument => vendorDocument.document),
    tslib_1.__metadata("design:type", Array)
], Document.prototype, "vendorDocument", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Document.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Document.prototype, "updateDetails", null);
Document = tslib_1.__decorate([
    (0, typeorm_1.Entity)('document')
], Document);
exports.Document = Document;
//# sourceMappingURL=Document.js.map