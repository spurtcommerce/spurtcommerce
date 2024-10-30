"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const PageTranslationRepository_1 = require("../repositories/PageTranslationRepository");
let PageTranslationService = class PageTranslationService {
    constructor(pageTranslationRepository, log) {
        this.pageTranslationRepository = pageTranslationRepository;
        this.log = log;
    }
    // create page translation
    create(page) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new page translation');
            return this.pageTranslationRepository.save(page);
        });
    }
    // find one page translation
    findOne(page) {
        return this.pageTranslationRepository.findOne(page);
    }
    // find one page translation
    find(page) {
        return this.pageTranslationRepository.find(page);
    }
    // page translation list
    list(limit, offset, select = [], relations = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relations && relations.length > 0) {
            condition.relations = relations;
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
        condition.order = { createdDate: 'DESC' };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.pageTranslationRepository.count(condition);
        }
        else {
            return this.pageTranslationRepository.find(condition);
        }
    }
    // delete page translation
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.pageTranslationRepository.delete(id);
        });
    }
};
PageTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [PageTranslationRepository_1.PageTranslationRepository, Object])
], PageTranslationService);
exports.PageTranslationService = PageTranslationService;
//# sourceMappingURL=PageTranslationService.js.map