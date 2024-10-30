"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const PluginRepository_1 = require("../repositories/PluginRepository");
const index_1 = require("typeorm/index");
let PluginService = class PluginService {
    constructor(pluginRepository) {
        this.pluginRepository = pluginRepository;
    }
    // create related product
    create(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.pluginRepository.save(product);
            return newProduct;
        });
    }
    // find plugins
    findAll(plugins) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.pluginRepository.find(plugins);
        });
    }
    // country List
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
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.pluginRepository.count(condition);
        }
        else {
            return this.pluginRepository.find(condition);
        }
    }
    // delete plugin
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.pluginRepository.delete(id);
            return newProduct;
        });
    }
    // find one plugin
    findOne(plugins) {
        return this.pluginRepository.findOne(plugins);
    }
    // Plugin list
    pluginList(limit, offset, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.pluginRepository.pluginList(limit, offset, count);
        });
    }
};
PluginService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [PluginRepository_1.PluginRepository])
], PluginService);
exports.PluginService = PluginService;
//# sourceMappingURL=PluginService.js.map