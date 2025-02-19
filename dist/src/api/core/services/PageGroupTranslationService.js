"use strict";
/*
 * spurtcommerce API
 * version 4.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const PageGroupTranslationRepository_1 = require("../repositories/PageGroupTranslationRepository");
const typeorm_1 = require("typeorm");
let PageGroupTranslationService = class PageGroupTranslationService {
    constructor(pageGroupTranslationRepository, log) {
        this.pageGroupTranslationRepository = pageGroupTranslationRepository;
        this.log = log;
    }
    // create page group translation
    create(page) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new page group translation');
            return this.pageGroupTranslationRepository.save(page);
        });
    }
    // find one page group translation
    findOne(page) {
        return this.pageGroupTranslationRepository.findOne(page);
    }
    // page group translation list
    list(limit, offset, select = [], search = [], relation = [], whereConditions = [], count) {
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
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
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
            return this.pageGroupTranslationRepository.count(condition);
        }
        else {
            return this.pageGroupTranslationRepository.find(condition);
        }
    }
    // delete page group translation
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.pageGroupTranslationRepository.delete(id);
        });
    }
};
PageGroupTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [PageGroupTranslationRepository_1.PageGroupTranslationRepository, Object])
], PageGroupTranslationService);
exports.PageGroupTranslationService = PageGroupTranslationService;
//# sourceMappingURL=PageGroupTranslationService.js.map