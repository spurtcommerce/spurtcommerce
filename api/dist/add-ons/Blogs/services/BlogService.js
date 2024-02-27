"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const index_1 = require("typeorm/index");
const BlogRepository_1 = require("../repositories/BlogRepository");
let BlogService = class BlogService {
    constructor(blogRepository, log) {
        this.blogRepository = blogRepository;
        this.log = log;
    }
    // create blog
    create(blog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new blog ');
            return this.blogRepository.save(blog);
        });
    }
    // find One blog
    findOne(blog) {
        return this.blogRepository.findOne(blog);
    }
    // findAll blog
    findAll(blog) {
        return this.blogRepository.find(blog);
    }
    // update blog
    update(blog) {
        return this.blogRepository.save(blog);
    }
    // blog List
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
            condition.order = { createdDate: 'DESC' };
            if (limit && limit > 0) {
                condition.take = limit;
                condition.skip = offset;
            }
            if (count) {
                return this.blogRepository.count(condition);
            }
            else {
                return this.blogRepository.find(condition);
            }
        });
    }
    // delete blog
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.delete(id);
        });
    }
    slugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.blogSlug(data);
        });
    }
    checkSlug(slug, id, count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (count > 0) {
                slug = slug + count;
            }
            return yield this.blogRepository.checkSlugData(slug, id);
        });
    }
};
BlogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [BlogRepository_1.BlogRepository, Object])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=BlogService.js.map