"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tickets = exports.Status = exports.UserType = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
const TicketMessages_1 = require("./TicketMessages");
const TicketCategories_1 = require("./TicketCategories");
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "admin";
    UserType["SELLER"] = "seller";
    UserType["BUYER"] = "buyer";
})(UserType || (exports.UserType = UserType = {}));
var Status;
(function (Status) {
    Status["OPEN"] = "open";
    Status["PENDING"] = "pending";
    Status["RESOLVED"] = "resolved";
})(Status || (exports.Status = Status = {}));
let Tickets = class Tickets extends BaseModel_1.BaseModel {
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
exports.Tickets = Tickets;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Tickets.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'ref_id' }),
    tslib_1.__metadata("design:type", String)
], Tickets.prototype, "refId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", Number)
], Tickets.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'user_type',
        type: 'enum',
        enum: UserType,
    }),
    tslib_1.__metadata("design:type", String)
], Tickets.prototype, "userType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], Tickets.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sub_category_id' }),
    tslib_1.__metadata("design:type", Number)
], Tickets.prototype, "subCategoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'subject' }),
    tslib_1.__metadata("design:type", String)
], Tickets.prototype, "subject", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], Tickets.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Tickets.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], Tickets.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: Status,
    }),
    tslib_1.__metadata("design:type", String)
], Tickets.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => TicketMessages_1.TicketMessages, ticketMessage => ticketMessage.tickets),
    tslib_1.__metadata("design:type", Array)
], Tickets.prototype, "ticketMessage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => TicketCategories_1.TicketCategories, ticketCategory => ticketCategory.tickets),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", TicketCategories_1.TicketCategories)
], Tickets.prototype, "ticketCategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Tickets.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Tickets.prototype, "updateDetails", null);
exports.Tickets = Tickets = tslib_1.__decorate([
    (0, typeorm_1.Entity)('tickets')
], Tickets);
//# sourceMappingURL=Tickets.js.map