"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const SettingsRepository_1 = require("../repositories/SettingsRepository");
const typeorm_1 = require("typeorm");
let SettingService = class SettingService {
    constructor(settingsRepository, log) {
        this.settingsRepository = settingsRepository;
        this.log = log;
    }
    // find one condition
    findOne(condition) {
        return this.settingsRepository.findOne(condition ? condition : {});
    }
    // find all setting
    findAll(condition) {
        this.log.info('Find all setting');
        return this.settingsRepository.find(condition !== null && condition !== void 0 ? condition : {});
    }
    // setting list
    list(limit, select = [], relation = [], whereConditions = []) {
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
                const operator = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
        }
        return this.settingsRepository.find(condition);
    }
    // create setting
    create(settings) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newSettings = yield this.settingsRepository.save(settings);
            return newSettings;
        });
    }
    // update setting
    update(condition, settings) {
        return this.settingsRepository.update(condition, settings);
    }
    // delete setting
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product');
            const newSettings = yield this.settingsRepository.delete(id);
            return newSettings;
        });
    }
};
SettingService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [SettingsRepository_1.SettingsRepository, Object])
], SettingService);
exports.SettingService = SettingService;
//# sourceMappingURL=SettingService.js.map