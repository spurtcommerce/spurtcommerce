"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const CategoryTranslationRepository_1 = require("../repositories/CategoryTranslationRepository");
let CategoryTranslationService = class CategoryTranslationService {
    constructor(categoryTranslationRepository, log) {
        this.categoryTranslationRepository = categoryTranslationRepository;
        this.log = log;
    }
    // create categoryTranslation
    save(categoryTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new categoryTranslation ');
            return this.categoryTranslationRepository.save(categoryTranslation);
        });
    }
    bulkSave(categoryTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.categoryTranslationRepository.save(categoryTranslation);
        });
    }
    // find Condition
    findOne(categoryTranslation) {
        return this.categoryTranslationRepository.findOne(categoryTranslation);
    }
    // update categoryTranslation
    update(categoryTranslation) {
        return this.categoryTranslationRepository.save(categoryTranslation);
    }
    // categoryTranslation List
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
            position: 'ASC',
            createdDate: 'DESC',
        };
        if (count) {
            return this.categoryTranslationRepository.count(condition);
        }
        else {
            return this.categoryTranslationRepository.find(condition);
        }
    }
    // delete categoryTranslation
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryTranslationRepository.delete(id);
        });
    }
};
CategoryTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CategoryTranslationRepository_1.CategoryTranslationRepository, Object])
], CategoryTranslationService);
exports.CategoryTranslationService = CategoryTranslationService;
//# sourceMappingURL=CategoryTranslationService.js.map