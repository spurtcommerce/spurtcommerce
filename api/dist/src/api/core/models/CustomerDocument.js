"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDocument = exports.DocumentStatus = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const Customer_1 = require("./Customer");
const class_validator_1 = require("class-validator");
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus[DocumentStatus["Rejected"] = 0] = "Rejected";
    DocumentStatus[DocumentStatus["Approved"] = 1] = "Approved";
    DocumentStatus[DocumentStatus["Pending"] = 2] = "Pending";
})(DocumentStatus = exports.DocumentStatus || (exports.DocumentStatus = {}));
let CustomerDocument = class CustomerDocument extends BaseModel_1.BaseModel {
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
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'customer_document_id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerDocument.prototype, "customerDocumentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerDocument.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], CustomerDocument.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], CustomerDocument.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'path' }),
    tslib_1.__metadata("design:type", String)
], CustomerDocument.prototype, "path", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'document_status' }),
    tslib_1.__metadata("design:type", Number)
], CustomerDocument.prototype, "documentStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Customer_1.Customer, customer => customer.customerDocument),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], CustomerDocument.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerDocument.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerDocument.prototype, "updateDetails", null);
CustomerDocument = tslib_1.__decorate([
    (0, typeorm_1.Entity)('customer_document')
], CustomerDocument);
exports.CustomerDocument = CustomerDocument;
//# sourceMappingURL=CustomerDocument.js.map