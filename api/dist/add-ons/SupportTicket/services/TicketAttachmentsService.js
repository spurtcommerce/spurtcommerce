"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketAttachmentsService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../src/decorators/Logger");
const index_1 = require("typeorm/index");
const TicketAttachmentsRepository_1 = require("../repositories/TicketAttachmentsRepository");
let TicketAttachmentsService = class TicketAttachmentsService {
    constructor(ticketAttachmentsRepository, log) {
        this.ticketAttachmentsRepository = ticketAttachmentsRepository;
        this.log = log;
    }
    // create ticketAttachments
    create(ticketAttachments) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new ticketAttachments ');
            return this.ticketAttachmentsRepository.repository.save(ticketAttachments);
        });
    }
    // find Condition
    findOne(ticketAttachments) {
        return this.ticketAttachmentsRepository.repository.findOne(ticketAttachments);
    }
    // update ticketAttachments
    update(ticketAttachments) {
        return this.ticketAttachmentsRepository.repository.save(ticketAttachments);
    }
    // ticketAttachments List
    list(limit, offset, select = [], relations = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.relations = [];
        if (relations && relations.length > 0) {
            relations.forEach((table) => {
                condition.relations.push(table.tableName);
            });
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.ticketAttachmentsRepository.repository.count(condition);
        }
        else {
            return this.ticketAttachmentsRepository.repository.find(condition);
        }
    }
    // delete ticketAttachments
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ticketAttachmentsRepository.repository.delete(id);
        });
    }
};
exports.TicketAttachmentsService = TicketAttachmentsService;
exports.TicketAttachmentsService = TicketAttachmentsService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [TicketAttachmentsRepository_1.TicketAttachmentsRepository, Object])
], TicketAttachmentsService);
//# sourceMappingURL=TicketAttachmentsService.js.map