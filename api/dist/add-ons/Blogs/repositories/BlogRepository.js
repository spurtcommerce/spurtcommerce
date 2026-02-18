"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const tslib_1 = require("tslib");
const Blog_1 = require("../models/Blog");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let BlogRepository = class BlogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Blog_1.Blog);
    }
    blogSlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(Blog_1.Blog, 'blog');
            query.where('blog.title = :value', { value: data });
            return query.getMany();
        });
    }
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(Blog_1.Blog, 'blog');
            query.where('blog.blog_slug = :slug', { slug });
            if (id > 0) {
                query.andWhere('blog.id != :id', { id });
            }
            return query.getCount();
        });
    }
};
exports.BlogRepository = BlogRepository;
exports.BlogRepository = BlogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], BlogRepository);
//# sourceMappingURL=BlogRepository.js.map