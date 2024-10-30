"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGlobalSettingService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const VendorSettingRepository_1 = require("../repositories/VendorSettingRepository");
let VendorGlobalSettingService = class VendorGlobalSettingService {
    constructor(vendorGlobalSettingRepository, log) {
        this.vendorGlobalSettingRepository = vendorGlobalSettingRepository;
        this.log = log;
    }
    // create page
    create(setting) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new page ');
            return this.vendorGlobalSettingRepository.save(setting);
        });
    }
    // find one page
    findOne() {
        return this.vendorGlobalSettingRepository.findOne();
    }
    // find one page
    findOneData(data) {
        return this.vendorGlobalSettingRepository.findOne(data);
    }
    // update page
    update(id, vendorGlobalSetting) {
        this.log.info('Update a page');
        vendorGlobalSetting.settingId = id;
        return this.vendorGlobalSettingRepository.save(vendorGlobalSetting);
    }
    // page List
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
        condition.order = { createdDate: 'DESC' };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorGlobalSettingRepository.count(condition);
        }
        else {
            return this.vendorGlobalSettingRepository.find(condition);
        }
    }
    // delete page
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorGlobalSettingRepository.delete(id);
        });
    }
};
VendorGlobalSettingService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorSettingRepository_1.VendorGlobalSettingRepository, Object])
], VendorGlobalSettingService);
exports.VendorGlobalSettingService = VendorGlobalSettingService;
//# sourceMappingURL=VendorSettingService.js.map