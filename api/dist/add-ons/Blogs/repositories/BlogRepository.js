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
const typeorm_1 = require("typeorm");
const Blog_1 = require("../models/Blog");
let BlogRepository = class BlogRepository extends typeorm_1.Repository {
    blogSlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Blog_1.Blog, 'blog');
            query.where('blog.title = :value', { value: data });
            return query.getMany();
        });
    }
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Blog_1.Blog, 'blog');
            query.where('blog.blog_slug = :slug', { slug });
            if (id > 0) {
                query.andWhere('blog.id != :id', { id });
            }
            return query.getCount();
        });
    }
};
BlogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Blog_1.Blog)
], BlogRepository);
exports.BlogRepository = BlogRepository;
//# sourceMappingURL=BlogRepository.js.map