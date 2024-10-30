"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Page_1 = require("../models/Page");
let PageRepository = class PageRepository extends typeorm_1.Repository {
    pageSlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Page_1.Page, 'page');
            query.where('page.title = :value', { value: data });
            return query.getMany();
        });
    }
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Page_1.Page, 'page');
            query.where('page.slug_name = :slug', { slug });
            if (id > 0) {
                query.andWhere('page.page_id != :id', { id });
            }
            return query.getCount();
        });
    }
};
PageRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Page_1.Page)
], PageRepository);
exports.PageRepository = PageRepository;
//# sourceMappingURL=PageRepository.js.map