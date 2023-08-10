"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDocumentService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const CustomerDocumentRepository_1 = require("../repositories/CustomerDocumentRepository");
let CustomerDocumentService = class CustomerDocumentService {
    constructor(customerDocumentRepository, log) {
        this.customerDocumentRepository = customerDocumentRepository;
        this.log = log;
    }
    // create customer document
    create(customerDocument) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new customer document ');
            return this.customerDocumentRepository.save(customerDocument);
        });
    }
    // find Condition
    findOne(customerDocument) {
        return this.customerDocumentRepository.findOne(customerDocument);
    }
    // find Condition
    findAll() {
        return this.customerDocumentRepository.find();
    }
    // update customer document
    update(id, customerDocument) {
        customerDocument.customerDocumentId = id;
        return this.customerDocumentRepository.save(customerDocument);
    }
    // customer document List
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
            return this.customerDocumentRepository.count(condition);
        }
        else {
            return this.customerDocumentRepository.find(condition);
        }
    }
    // delete customer document
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.customerDocumentRepository.delete(id);
        });
    }
};
CustomerDocumentService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CustomerDocumentRepository_1.CustomerDocumentRepository, Object])
], CustomerDocumentService);
exports.CustomerDocumentService = CustomerDocumentService;
//# sourceMappingURL=CustomerDocumentService.js.map