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
exports.ServiceImageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const ServiceImageRepository_1 = require("../repositories/ServiceImageRepository");
let ServiceImageService = class ServiceImageService {
    constructor(serviceImageRepository, log) {
        this.serviceImageRepository = serviceImageRepository;
        this.log = log;
    }
    // create service
    create(serviceImage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new serviceImage');
            return this.serviceImageRepository.save(serviceImage);
        });
    }
    // find one service image
    findOne(serviceImage) {
        return this.serviceImageRepository.findOne(serviceImage);
    }
    // find all service images
    findAll(serviceImage) {
        return this.serviceImageRepository.find(serviceImage);
    }
    // update service images
    update(id, serviceImage) {
        this.log.info('Update a serviceImage');
        return this.serviceImageRepository.save(serviceImage);
    }
    // service Image List
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
        if (count) {
            return this.serviceImageRepository.count(condition);
        }
        else {
            return this.serviceImageRepository.find(condition);
        }
    }
    // delete service image
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.serviceImageRepository.delete(id);
        });
    }
    // delete service
    deleteProduct(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.serviceImageRepository.delete({ serviceId: id });
        });
    }
};
ServiceImageService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ServiceImageRepository_1.ServiceImageRepository, Object])
], ServiceImageService);
exports.ServiceImageService = ServiceImageService;
//# sourceMappingURL=ServiceImageService.js.map