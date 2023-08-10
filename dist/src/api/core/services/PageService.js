"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const PageRepository_1 = require("../repositories/PageRepository");
let PageService = class PageService {
    constructor(pageRepository, log) {
        this.pageRepository = pageRepository;
        this.log = log;
    }
    // create page
    create(page) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new page ');
            return this.pageRepository.save(page);
        });
    }
    // find one page
    findOne(page) {
        return this.pageRepository.findOne(page);
    }
    // find one page
    find(page) {
        return this.pageRepository.find(page);
    }
    // update page
    update(id, page) {
        this.log.info('Update a page');
        page.pageId = id;
        return this.pageRepository.save(page);
    }
    // page List
    list(limit, offset, select = [], relations = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relations && relations.length > 0) {
            condition.relations = relations;
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
            return this.pageRepository.count(condition);
        }
        else {
            return this.pageRepository.find(condition);
        }
    }
    // delete page
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.pageRepository.delete(id);
        });
    }
    slugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.pageRepository.pageSlug(data);
        });
    }
    checkSlug(slug, id, count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (count > 0) {
                slug = slug + count;
            }
            return yield this.pageRepository.checkSlugData(slug, id);
        });
    }
};
PageService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [PageRepository_1.PageRepository, Object])
], PageService);
exports.PageService = PageService;
//# sourceMappingURL=PageService.js.map