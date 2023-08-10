"use strict";
/*
 * spurtcommerce API
 * version 4.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const PageGroupRepository_1 = require("../repositories/PageGroupRepository");
const typeorm_1 = require("typeorm");
let PageGroupService = class PageGroupService {
    constructor(pageGroupRepository, log) {
        this.pageGroupRepository = pageGroupRepository;
        this.log = log;
    }
    // create page group
    create(page) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new page ');
            return this.pageGroupRepository.save(page);
        });
    }
    // find one page group
    findOne(page) {
        return this.pageGroupRepository.findOne(page);
    }
    // update page group
    update(id, pageGroup) {
        this.log.info('Update a page group');
        pageGroup.groupId = id;
        return this.pageGroupRepository.save(pageGroup);
    }
    // page group List
    list(limit, offset, select = [], search = [], relation = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
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
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.pageGroupRepository.count(condition);
        }
        else {
            return this.pageGroupRepository.find(condition);
        }
    }
    // delete page group
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.pageGroupRepository.delete(id);
        });
    }
};
PageGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [PageGroupRepository_1.PageGroupRepository, Object])
], PageGroupService);
exports.PageGroupService = PageGroupService;
//# sourceMappingURL=PageGroupService.js.map