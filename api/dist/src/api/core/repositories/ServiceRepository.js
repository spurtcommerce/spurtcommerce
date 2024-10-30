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
exports.ServiceRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Service_1 = require("../models/Service");
const ServiceToCategory_1 = require("../models/ServiceToCategory");
let ServiceRepository = class ServiceRepository extends typeorm_1.Repository {
    serviceList(limit, offset, select = [], searchConditions = [], whereConditions = [], categoryId = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Service_1.Services, 'service');
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
                            const subQb = this.manager
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
ServiceRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Service_1.Services)
], ServiceRepository);
exports.ServiceRepository = ServiceRepository;
//# sourceMappingURL=ServiceRepository.js.map