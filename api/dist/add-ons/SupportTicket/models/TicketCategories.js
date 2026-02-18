"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCategories = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
const Tickets_1 = require("./Tickets");
let TicketCategories = class TicketCategories extends BaseModel_1.BaseModel {
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
exports.TicketCategories = TicketCategories;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], TicketCategories.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'category_name' }),
    tslib_1.__metadata("design:type", String)
], TicketCategories.prototype, "categoryName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'parent_category_id' }),
    tslib_1.__metadata("design:type", Number)
], TicketCategories.prototype, "parentCategoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], TicketCategories.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], TicketCategories.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_type' }),
    tslib_1.__metadata("design:type", Number)
], TicketCategories.prototype, "categoryType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)((type) => Tickets_1.Tickets, tickets => tickets.ticketCategory),
    tslib_1.__metadata("design:type", Array)
], TicketCategories.prototype, "tickets", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TicketCategories.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TicketCategories.prototype, "updateDetails", null);
exports.TicketCategories = TicketCategories = tslib_1.__decorate([
    (0, typeorm_1.Entity)('ticket_categories')
], TicketCategories);
//# sourceMappingURL=TicketCategories.js.map