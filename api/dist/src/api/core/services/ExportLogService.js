"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const typeorm_1 = require("typeorm");
const ExportLogRepository_1 = require("../repositories/ExportLogRepository");
let ExportLogService = class ExportLogService {
    constructor(exportLogRepository, log) {
        this.exportLogRepository = exportLogRepository;
        this.log = log;
    }
    // find exportLog
    findOne(findCondition) {
        this.log.info('Find all exportLogs');
        return this.exportLogRepository.findOne(findCondition);
    }
    // exportLog list
    list(limit = 0, offset = 0, select = [], relation = [], whereConditions = [], search = [], keyword, count) {
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
                condition.where[item.name] = item.value;
            });
        }
        if (keyword) {
            condition.where = {
                module: (0, typeorm_1.Like)('%' + keyword + '%'),
            };
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
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
            return this.exportLogRepository.count(condition);
        }
        else {
            return this.exportLogRepository.find(condition);
        }
    }
    // create exportLog
    create(exportLog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new exportLog');
            const newExport = yield this.exportLogRepository.save(exportLog);
            return newExport;
        });
    }
    // update exportLog
    update(id, exportLog) {
        this.log.info('Update a exportLog');
        exportLog.id = id;
        return this.exportLogRepository.save(exportLog);
    }
    // delete exportLog
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a exportLog');
            const newExport = yield this.exportLogRepository.delete(id);
            return newExport;
        });
    }
    // find exportLog
    findAll(findCondition) {
        this.log.info('Find all exportLogs');
        return this.exportLogRepository.find(findCondition);
    }
};
ExportLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ExportLogRepository_1.ExportLogRepository, Object])
], ExportLogService);
exports.ExportLogService = ExportLogService;
//# sourceMappingURL=ExportLogService.js.map