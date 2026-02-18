"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
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
            return this.categoryTranslationRepository.repository.save(categoryTranslation);
        });
    }
    bulkSave(categoryTranslation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.categoryTranslationRepository.repository.save(categoryTranslation);
        });
    }
    // find Condition
    findOne(categoryTranslation) {
        return this.categoryTranslationRepository.repository.findOne(categoryTranslation);
    }
    // update categoryTranslation
    update(categoryTranslation) {
        return this.categoryTranslationRepository.repository.save(categoryTranslation);
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
            return this.categoryTranslationRepository.repository.count(condition);
        }
        else {
            return this.categoryTranslationRepository.repository.find(condition);
        }
    }
    // delete categoryTranslation
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryTranslationRepository.repository.delete(id);
        });
    }
};
exports.CategoryTranslationService = CategoryTranslationService;
exports.CategoryTranslationService = CategoryTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CategoryTranslationRepository_1.CategoryTranslationRepository, Object])
], CategoryTranslationService);
//# sourceMappingURL=CategoryTranslationService.js.map