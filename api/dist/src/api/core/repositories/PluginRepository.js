"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../models/Plugin");
let PluginRepository = class PluginRepository extends typeorm_1.Repository {
    pluginList(limit, offset, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Plugin_1.Plugins, 'plugins');
            query.select(['plugins.pluginName', 'plugins.pluginType', 'plugins.pluginStatus', 'plugins.slugName', 'plugins.pluginAdditionalInfo']);
            query.where('plugins.pluginType NOT IN (:names)', { names: ['Payment'] }); // 'Oauth'
            if (limit > 0) {
                query.limit(limit);
                query.offset(offset);
            }
            if (count) {
                return query.getCount();
            }
            return query.getMany();
        });
    }
};
PluginRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Plugin_1.Plugins)
], PluginRepository);
exports.PluginRepository = PluginRepository;
//# sourceMappingURL=PluginRepository.js.map