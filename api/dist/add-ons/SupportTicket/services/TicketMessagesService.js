"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMessageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../src/decorators/Logger");
const index_1 = require("typeorm/index");
const TicketMessagesRepository_1 = require("../repositories/TicketMessagesRepository");
let TicketMessageService = class TicketMessageService {
    constructor(ticketMessagesRepository, log) {
        this.ticketMessagesRepository = ticketMessagesRepository;
        this.log = log;
    }
    // create ticketMessage
    create(ticketMessage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new ticketMessage ');
            return this.ticketMessagesRepository.repository.save(ticketMessage);
        });
    }
    // findone Condition
    findOne(ticketMessage) {
        return this.ticketMessagesRepository.repository.findOne(ticketMessage);
    }
    // find Condition
    find(ticketMessage) {
        return this.ticketMessagesRepository.repository.find(ticketMessage);
    }
    // update ticketMessage
    update(ticketMessage) {
        return this.ticketMessagesRepository.repository.save(ticketMessage);
    }
    // ticketMessage List
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
            return this.ticketMessagesRepository.repository.count(condition);
        }
        else {
            return this.ticketMessagesRepository.repository.find(condition);
        }
    }
    // delete ticketMessage
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ticketMessagesRepository.repository.delete(id);
        });
    }
};
exports.TicketMessageService = TicketMessageService;
exports.TicketMessageService = TicketMessageService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [TicketMessagesRepository_1.TicketMessagesRepository, Object])
], TicketMessageService);
//# sourceMappingURL=TicketMessagesService.js.map