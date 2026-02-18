"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMessages = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
const Tickets_1 = require("./Tickets");
const TicketAttachments_1 = require("./TicketAttachments");
let TicketMessages = class TicketMessages extends BaseModel_1.BaseModel {
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
exports.TicketMessages = TicketMessages;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], TicketMessages.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'ticket_id' }),
    tslib_1.__metadata("design:type", Number)
], TicketMessages.prototype, "ticketId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sender_id' }),
    tslib_1.__metadata("design:type", Number)
], TicketMessages.prototype, "senderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sender_type' }),
    tslib_1.__metadata("design:type", String)
], TicketMessages.prototype, "senderType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'message' }),
    tslib_1.__metadata("design:type", String)
], TicketMessages.prototype, "message", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sent_at' }),
    tslib_1.__metadata("design:type", String)
], TicketMessages.prototype, "sentAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], TicketMessages.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], TicketMessages.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_type' }),
    tslib_1.__metadata("design:type", String)
], TicketMessages.prototype, "createdByType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'modified_by_type' }),
    tslib_1.__metadata("design:type", String)
], TicketMessages.prototype, "modifiedByType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => Tickets_1.Tickets, tickets => tickets.ticketMessage),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_id' }),
    tslib_1.__metadata("design:type", Tickets_1.Tickets)
], TicketMessages.prototype, "tickets", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => TicketAttachments_1.TicketAttachments, ticketAttachments => ticketAttachments.ticketMessage),
    tslib_1.__metadata("design:type", Array)
], TicketMessages.prototype, "ticketAttachments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TicketMessages.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TicketMessages.prototype, "updateDetails", null);
exports.TicketMessages = TicketMessages = tslib_1.__decorate([
    (0, typeorm_1.Entity)('ticket_messages')
], TicketMessages);
//# sourceMappingURL=TicketMessages.js.map