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
exports.ServiceService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ServiceRepository_1 = require("../repositories/ServiceRepository");
const index_1 = require("typeorm/index");
let ServiceService = class ServiceService {
    constructor(serviceRepository, log) {
        this.serviceRepository = serviceRepository;
        this.log = log;
    }
    // create Services
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new Services => ', data.toString());
            return this.serviceRepository.save(data);
        });
    }
    // findone Services
    findOne(data) {
        return this.serviceRepository.findOne(data);
    }
    // delete Services
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a Services');
            yield this.serviceRepository.delete(id);
            return;
        });
    }
    // find Services
    find(data) {
        return this.serviceRepository.find(data);
    }
    // service list
    serviceList(limit, offset, select = [], searchConditions = [], whereConditions = [], categoryId = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.serviceRepository.serviceList(limit, offset, select, searchConditions, whereConditions, categoryId, count);
        });
    }
    // Services List
    list(limit, offset, select = [], search = [], whereConditions = [], price, count) {
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
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (price) {
            condition.order = { price: (price === 2) ? 'DESC' : 'ASC' };
        }
        else {
            condition.order = { createdDate: 'DESC' };
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.serviceRepository.count(condition);
        }
        return this.serviceRepository.find(condition);
    }
};
ServiceService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ServiceRepository_1.ServiceRepository, Object])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=ServiceService.js.map