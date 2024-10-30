"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementItemService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const SettlementItemRepository_1 = require("../repositories/SettlementItemRepository");
const typeorm_1 = require("typeorm");
let SettlementItemService = class SettlementItemService {
    constructor(settlementItemRepository, log) {
        this.settlementItemRepository = settlementItemRepository;
        this.log = log;
    }
    // find one condition
    findOne(data) {
        return this.settlementItemRepository.findOne(data);
    }
    // find all
    findAll(data) {
        this.log.info('Find all');
        return this.settlementItemRepository.find(data);
    }
    // list
    list(limit, offset, select = [], relation = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                const operator = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
            });
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.settlementItemRepository.count(condition);
        }
        else {
            return this.settlementItemRepository.find(condition);
        }
    }
    // create
    create(settlementItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newSettlement = yield this.settlementItemRepository.save(settlementItem);
            return newSettlement;
        });
    }
    // update
    update(id, settlementItem) {
        this.log.info('Update');
        settlementItem.id = id;
        return this.settlementItemRepository.save(settlementItem);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete');
            const newSettlement = yield this.settlementItemRepository.delete(id);
            return newSettlement;
        });
    }
};
SettlementItemService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [SettlementItemRepository_1.SettlementItemRepository, Object])
], SettlementItemService);
exports.SettlementItemService = SettlementItemService;
//# sourceMappingURL=SettlementItemService.js.map