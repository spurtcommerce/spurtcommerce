"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const ProductQuestionRepository_1 = require("../repositories/ProductQuestionRepository");
const index_1 = require("typeorm/index");
let ProductQuestionService = class ProductQuestionService {
    constructor(productQuestionRepository, log) {
        this.productQuestionRepository = productQuestionRepository;
        this.log = log;
    }
    // create Country
    create(question) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new product question ');
            return this.productQuestionRepository.save(question);
        });
    }
    // findCondition
    findOne(question) {
        return this.productQuestionRepository.findOne(question);
    }
    // update country
    update(id, question) {
        question.questionId = id;
        return this.productQuestionRepository.save(question);
    }
    // country List
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
            return this.productQuestionRepository.count(condition);
        }
        else {
            return this.productQuestionRepository.find(condition);
        }
    }
    // delete Country
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productQuestionRepository.delete(id);
        });
    }
    // find a data
    findAll(productDiscount) {
        this.log.info('Find a data');
        return this.productQuestionRepository.find(productDiscount);
    }
};
ProductQuestionService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductQuestionRepository_1.ProductQuestionRepository, Object])
], ProductQuestionService);
exports.ProductQuestionService = ProductQuestionService;
//# sourceMappingURL=ProductQuestionService.js.map