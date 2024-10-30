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
exports.ServiceToCategoryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ServiceToCategoryRepository_1 = require("../repositories/ServiceToCategoryRepository");
const typeorm_1 = require("typeorm");
let ServiceToCategoryService = class ServiceToCategoryService {
    constructor(serviceToCategoryRepository, log) {
        this.serviceToCategoryRepository = serviceToCategoryRepository;
        this.log = log;
    }
    // create ServiceToCategory
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new ServiceToCategory => ', data.toString());
            return this.serviceToCategoryRepository.save(data);
        });
    }
    // findone ServiceToCategory
    findOne(data) {
        return this.serviceToCategoryRepository.findOne(data);
    }
    // delete ServiceToCategory
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a ServiceToCategory');
            return this.serviceToCategoryRepository.delete(id);
        });
    }
    // find ServiceToCategory
    find(data) {
        return this.serviceToCategoryRepository.find(data);
    }
    // ServiceToCategory List
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
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.serviceToCategoryRepository.count(condition);
        }
        return this.serviceToCategoryRepository.find(condition);
    }
};
ServiceToCategoryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ServiceToCategoryRepository_1.ServiceToCategoryRepository, Object])
], ServiceToCategoryService);
exports.ServiceToCategoryService = ServiceToCategoryService;
//# sourceMappingURL=ServiceToCategoryService.js.map