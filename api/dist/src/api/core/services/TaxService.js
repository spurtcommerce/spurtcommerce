"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const TaxRepository_1 = require("../repositories/TaxRepository");
const typeorm_1 = require("typeorm");
let TaxService = class TaxService {
    constructor(taxRepository, log) {
        this.taxRepository = taxRepository;
        this.log = log;
    }
    // find tax
    findOne(findCondition) {
        this.log.info('Find all tax');
        return this.taxRepository.findOne(findCondition);
    }
    // tax list
    list(limit = 0, offset = 0, select = [], whereConditions = [], keyword, count) {
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
        if (keyword) {
            condition.where = {
                taxName: (0, typeorm_1.Like)('%' + keyword + '%'),
            };
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.taxRepository.count(condition);
        }
        else {
            return this.taxRepository.find(condition);
        }
    }
    // create tax
    create(tax) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new tax => ', tax.toString());
            const newTax = yield this.taxRepository.save(tax);
            return newTax;
        });
    }
    // update tax
    update(id, tax) {
        this.log.info('Update a tax');
        tax.taxId = id;
        return this.taxRepository.save(tax);
    }
    // delete tax
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a tax');
            const newTax = yield this.taxRepository.delete(id);
            return newTax;
        });
    }
    // find tax
    findAll(findCondition) {
        this.log.info('Find all tax');
        return this.taxRepository.find(findCondition);
    }
};
TaxService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [TaxRepository_1.TaxRepository, Object])
], TaxService);
exports.TaxService = TaxService;
//# sourceMappingURL=TaxService.js.map