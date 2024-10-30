"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ServiceCategoryRepository_1 = require("../repositories/ServiceCategoryRepository");
const index_1 = require("typeorm/index");
let ServiceCategoryService = class ServiceCategoryService {
    constructor(serviceCategoryRepository, log) {
        this.serviceCategoryRepository = serviceCategoryRepository;
        this.log = log;
    }
    // create Category
    create(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new category => ', category.toString());
            return this.serviceCategoryRepository.save(category);
        });
    }
    // findone category
    findOne(category) {
        return this.serviceCategoryRepository.findOne(category);
    }
    // delete Category
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a Category');
            yield this.serviceCategoryRepository.delete(id);
            return;
        });
    }
    // find category
    find(category) {
        return this.serviceCategoryRepository.find(category);
    }
    // Service category List
    list(limit, offset, select = [], search = [], whereConditions = [], sortOrder, count) {
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
        condition.order = { sortOrder: (sortOrder === 2) ? 'DESC' : 'ASC' };
        if (count) {
            return this.serviceCategoryRepository.count(condition);
        }
        return this.serviceCategoryRepository.find(condition);
    }
};
ServiceCategoryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ServiceCategoryRepository_1.ServiceCategoryRepository, Object])
], ServiceCategoryService);
exports.ServiceCategoryService = ServiceCategoryService;
//# sourceMappingURL=ServiceCategoryService.js.map