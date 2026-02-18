"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportTicketLogs = exports.ActionTaken = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
const Tickets_1 = require("./Tickets");
var ActionTaken;
(function (ActionTaken) {
    ActionTaken["CREATED"] = "created";
    ActionTaken["UPDATED"] = "updated";
    ActionTaken["RESPONDED"] = "responded";
    ActionTaken["CLOSED"] = "closed";
})(ActionTaken || (exports.ActionTaken = ActionTaken = {}));
let SupportTicketLogs = class SupportTicketLogs extends BaseModel_1.BaseModel {
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
exports.SupportTicketLogs = SupportTicketLogs;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SupportTicketLogs.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'ticket_id' }),
    tslib_1.__metadata("design:type", Number)
], SupportTicketLogs.prototype, "ticketId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'action_taken',
        type: 'enum',
        enum: ActionTaken,
    }),
    tslib_1.__metadata("design:type", String)
], SupportTicketLogs.prototype, "actionTaken", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'action_by' }),
    tslib_1.__metadata("design:type", Number)
], SupportTicketLogs.prototype, "actionBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'action_by_type',
        type: 'enum',
        enum: Tickets_1.UserType,
    }),
    tslib_1.__metadata("design:type", String)
], SupportTicketLogs.prototype, "actionByType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'action_at' }),
    tslib_1.__metadata("design:type", String)
], SupportTicketLogs.prototype, "actionAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], SupportTicketLogs.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], SupportTicketLogs.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'created_by_type',
        type: 'enum',
        enum: Tickets_1.UserType,
    }),
    tslib_1.__metadata("design:type", String)
], SupportTicketLogs.prototype, "createdByType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'modified_by_type',
        type: 'enum',
        enum: Tickets_1.UserType,
    }),
    tslib_1.__metadata("design:type", String)
], SupportTicketLogs.prototype, "modifiedByType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)((type) => Tickets_1.Tickets),
    tslib_1.__metadata("design:type", Tickets_1.Tickets)
], SupportTicketLogs.prototype, "tickets", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SupportTicketLogs.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SupportTicketLogs.prototype, "updateDetails", null);
exports.SupportTicketLogs = SupportTicketLogs = tslib_1.__decorate([
    (0, typeorm_1.Entity)('support_ticket_logs')
], SupportTicketLogs);
//# sourceMappingURL=SupportTicketLogs.js.map