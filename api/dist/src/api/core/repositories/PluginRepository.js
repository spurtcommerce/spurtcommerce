"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRepository = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../models/Plugin");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let PluginRepository = class PluginRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
    }
    pluginList(limit, offset, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('plugins');
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
exports.PluginRepository = PluginRepository;
exports.PluginRepository = PluginRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PluginRepository);
//# sourceMappingURL=PluginRepository.js.map