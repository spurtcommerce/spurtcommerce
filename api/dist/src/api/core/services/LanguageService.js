"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const LanguageRepository_1 = require("../repositories/LanguageRepository");
const index_1 = require("typeorm/index");
let LanguageService = class LanguageService {
    constructor(languageRepository, log) {
        this.languageRepository = languageRepository;
        this.log = log;
    }
    // create language
    create(language) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new language ');
            return this.languageRepository.save(language);
        });
    }
    // find condition
    find(language) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.languageRepository.find(language);
        });
    }
    // find Condition
    findOne(orderStatus) {
        return this.languageRepository.findOne(orderStatus);
    }
    // update language
    update(id, language) {
        language.languageId = id;
        return this.languageRepository.save(language);
    }
    // language List
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
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
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            sortOrder: 'ASC',
        };
        if (count) {
            return this.languageRepository.count(condition);
        }
        else {
            return this.languageRepository.find(condition);
        }
    }
    // delete language
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.languageRepository.delete(id);
        });
    }
};
LanguageService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [LanguageRepository_1.LanguageRepository, Object])
], LanguageService);
exports.LanguageService = LanguageService;
//# sourceMappingURL=LanguageService.js.map