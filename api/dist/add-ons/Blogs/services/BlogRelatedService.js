"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRelatedService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const index_1 = require("typeorm/index");
const BlogRelatedRepository_1 = require("../repositories/BlogRelatedRepository");
let BlogRelatedService = class BlogRelatedService {
    constructor(blogRelatedRepository, log) {
        this.blogRelatedRepository = blogRelatedRepository;
        this.log = log;
    }
    // create blog related
    create(blogRelated) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new blog related ');
            return this.blogRelatedRepository.save(blogRelated);
        });
    }
    // find One blog related
    findOne(blogRelated) {
        return this.blogRelatedRepository.findOne(blogRelated);
    }
    // findAll blog related
    findAll(blogRelated) {
        return this.blogRelatedRepository.find(blogRelated);
    }
    // update blog related
    update(blogRelated) {
        return this.blogRelatedRepository.save(blogRelated);
    }
    // blog related List
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                    if (operator === 'where' && table.value !== undefined) {
                        condition.where[table.name] = table.value;
                    }
                    else if (operator === 'like' && table.value !== undefined) {
                        condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                    }
                });
            }
            if (limit && limit > 0) {
                condition.take = limit;
                condition.skip = offset;
            }
            if (count) {
                return this.blogRelatedRepository.count(condition);
            }
            else {
                return this.blogRelatedRepository.find(condition);
            }
        });
    }
    // delete blog related
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.blogRelatedRepository.delete(id);
        });
    }
};
BlogRelatedService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [BlogRelatedRepository_1.BlogRelatedRepository, Object])
], BlogRelatedService);
exports.BlogRelatedService = BlogRelatedService;
//# sourceMappingURL=BlogRelatedService.js.map