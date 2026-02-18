"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const tslib_1 = require("tslib");
const Service_1 = require("../models/Service");
const ServiceToCategory_1 = require("../models/ServiceToCategory");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let ServiceRepository = class ServiceRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Service_1.Services);
    }
    serviceList(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], searchConditions = [], whereConditions = [], categoryId = [], count) {
            const query = yield this.repository.manager.createQueryBuilder(Service_1.Services, 'service');
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // Keyword Search
            if (searchConditions && searchConditions.length > 0) {
                searchConditions.forEach((table) => {
                    const operator = table.op;
                    if (operator === 'where' && table.value !== '') {
                        query.where(table.name + ' = ' + table.value);
                    }
                    else if (operator === 'and' && table.value !== '') {
                        query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                    }
                    else if (operator === 'or' && table.value !== '') {
                        query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                    }
                    else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                        query.andWhere(table.name + ' = ' + table.value);
                    }
                });
            }
            // Keyword Search
            if (categoryId) {
                if (whereConditions && whereConditions.length > 0) {
                    whereConditions.forEach((table) => {
                        const operator = table.op;
                        if (operator === 'inraw' && table.value !== undefined) {
                            const subQb = this.repository.manager
                                .getRepository(ServiceToCategory_1.ServiceToCategory)
                                .createQueryBuilder('serviceToCategory')
                                .select('service_id')
                                .where('service_category_id = ' + table.value);
                            query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                        }
                    });
                }
            }
            // Limit & Offset
            if (limit && limit > 0) {
                query.limit(limit);
                query.offset(offset);
            }
            if (count) {
                return query.getCount();
            }
            return query.getRawMany();
        });
    }
};
exports.ServiceRepository = ServiceRepository;
exports.ServiceRepository = ServiceRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceRepository);
//# sourceMappingURL=ServiceRepository.js.map