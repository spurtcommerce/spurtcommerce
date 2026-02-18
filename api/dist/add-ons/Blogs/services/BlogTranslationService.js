"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../src/decorators/Logger");
const index_1 = require("typeorm/index");
const BlogTranslationRepository_1 = require("../repositories/BlogTranslationRepository");
let BlogTranslationService = class BlogTranslationService {
    constructor(blogTranslationRepository, log) {
        this.blogTranslationRepository = blogTranslationRepository;
        this.log = log;
    }
    // create blog
    create(blog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new blog ');
            return this.blogTranslationRepository.repository.save(blog);
        });
    }
    // find One blog
    findOne(blog) {
        return this.blogTranslationRepository.repository.findOne(blog);
    }
    // findAll blog
    findAll(blog) {
        return this.blogTranslationRepository.repository.find(blog);
    }
    // update blog
    update(blog) {
        return this.blogTranslationRepository.repository.save(blog);
    }
    // blog List
    list(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], search = [], whereConditions = [], count) {
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
            condition.order = { createdDate: 'DESC' };
            if (limit && limit > 0) {
                condition.take = limit;
                condition.skip = offset;
            }
            if (count) {
                return this.blogTranslationRepository.repository.count(condition);
            }
            else {
                return this.blogTranslationRepository.repository.find(condition);
            }
        });
    }
    // delete blog
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.blogTranslationRepository.repository.delete(id);
        });
    }
};
exports.BlogTranslationService = BlogTranslationService;
exports.BlogTranslationService = BlogTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [BlogTranslationRepository_1.BlogTranslationRepository, Object])
], BlogTranslationService);
//# sourceMappingURL=BlogTranslationService.js.map