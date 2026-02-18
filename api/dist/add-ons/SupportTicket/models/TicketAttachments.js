"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketAttachments = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
// import { UserType } from './Tickets';
const TicketMessages_1 = require("./TicketMessages");
let TicketAttachments = class TicketAttachments extends BaseModel_1.BaseModel {
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
exports.TicketAttachments = TicketAttachments;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], TicketAttachments.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'ticket_message_id' }),
    tslib_1.__metadata("design:type", Number)
], TicketAttachments.prototype, "ticketMessageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    tslib_1.__metadata("design:type", String)
], TicketAttachments.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_path' }),
    tslib_1.__metadata("design:type", String)
], TicketAttachments.prototype, "filePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'uploaded_at' }),
    tslib_1.__metadata("design:type", String)
], TicketAttachments.prototype, "uploadedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], TicketAttachments.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], TicketAttachments.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_type' }),
    tslib_1.__metadata("design:type", Number)
], TicketAttachments.prototype, "fileType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_type' }),
    tslib_1.__metadata("design:type", String)
], TicketAttachments.prototype, "createdByType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'modified_by_type' }),
    tslib_1.__metadata("design:type", String)
], TicketAttachments.prototype, "modifiedByType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => TicketMessages_1.TicketMessages, ticketMessage => ticketMessage.ticketAttachments),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_message_id' }),
    tslib_1.__metadata("design:type", TicketMessages_1.TicketMessages)
], TicketAttachments.prototype, "ticketMessage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TicketAttachments.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TicketAttachments.prototype, "updateDetails", null);
exports.TicketAttachments = TicketAttachments = tslib_1.__decorate([
    (0, typeorm_1.Entity)('ticket_attachments')
], TicketAttachments);
//# sourceMappingURL=TicketAttachments.js.map