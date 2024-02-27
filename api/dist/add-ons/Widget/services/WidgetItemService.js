"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetItemService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const index_1 = require("typeorm/index");
const WidgetItemRepository_1 = require("../repositories/WidgetItemRepository");
let WidgetItemService = class WidgetItemService {
    constructor(widgetItemRepository, log) {
        this.widgetItemRepository = widgetItemRepository;
        this.log = log;
    }
    // create Widget Item
    create(widgetItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new widget Item ');
            return this.widgetItemRepository.save(widgetItem);
        });
    }
    // findOne Condition
    findOne(widgetItem) {
        return this.widgetItemRepository.findOne(widgetItem);
    }
    // find Condition
    find(data) {
        return this.widgetItemRepository.find(data);
    }
    // update Widget Item
    update(data) {
        return this.widgetItemRepository.save(data);
    }
    // Widget Item List
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
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.widgetItemRepository.count(condition);
        }
        else {
            return this.widgetItemRepository.find(condition);
        }
    }
    // delete Widget Item
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.widgetItemRepository.delete(id);
        });
    }
    // findProduct Condition
    findProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.widgetItemRepository.findProduct(productId);
        });
    }
    // findCategory Condition
    findCategory(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.widgetItemRepository.findCategory(categoryId);
        });
    }
};
WidgetItemService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [WidgetItemRepository_1.WidgetItemRepository, Object])
], WidgetItemService);
exports.WidgetItemService = WidgetItemService;
//# sourceMappingURL=WidgetItemService.js.map