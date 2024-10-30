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
exports.ServiceEnquiryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ServiceEnquiryRepository_1 = require("../repositories/ServiceEnquiryRepository");
const index_1 = require("typeorm/index");
let ServiceEnquiryService = class ServiceEnquiryService {
    constructor(serviceEnquiryRepository, log) {
        this.serviceEnquiryRepository = serviceEnquiryRepository;
        this.log = log;
    }
    // create enquiry
    create(enquiry) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new enquiry => ', enquiry.toString());
            return this.serviceEnquiryRepository.save(enquiry);
        });
    }
    // findone enquiry
    findOne(enquiry) {
        return this.serviceEnquiryRepository.findOne(enquiry);
    }
    // delete enquiry
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a enquiry');
            yield this.serviceEnquiryRepository.delete(id);
            return;
        });
    }
    // find enquiry
    find(enquiry) {
        return this.serviceEnquiryRepository.find(enquiry);
    }
    // enquiry list
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
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.serviceEnquiryRepository.count(condition);
        }
        return this.serviceEnquiryRepository.find(condition);
    }
};
ServiceEnquiryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ServiceEnquiryRepository_1.ServiceEnquiryRepository, Object])
], ServiceEnquiryService);
exports.ServiceEnquiryService = ServiceEnquiryService;
//# sourceMappingURL=ServiceEnquiryService.js.map