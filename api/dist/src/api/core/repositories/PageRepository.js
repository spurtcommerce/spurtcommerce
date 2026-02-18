"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRepository = void 0;
const tslib_1 = require("tslib");
const Page_1 = require("../models/Page");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let PageRepository = class PageRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Page_1.Page);
    }
    pageSlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('page');
            query.where('page.title = :value', { value: data });
            return query.getMany();
        });
    }
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('page');
            query.where('page.slug_name = :slug', { slug });
            if (id > 0) {
                query.andWhere('page.page_id != :id', { id });
            }
            return query.getCount();
        });
    }
};
exports.PageRepository = PageRepository;
exports.PageRepository = PageRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PageRepository);
//# sourceMappingURL=PageRepository.js.map