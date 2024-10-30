"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModuleService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const PermissionModuleRepository_1 = require("../repositories/PermissionModuleRepository");
let PermissionModuleService = class PermissionModuleService {
    constructor(permissionModuleRepository, log) {
        this.permissionModuleRepository = permissionModuleRepository;
        this.log = log;
    }
    // create permission module
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new page ');
            return this.permissionModuleRepository.save(data);
        });
    }
    // find one permission module
    findOne(data) {
        return this.permissionModuleRepository.findOne(data);
    }
    // update permission module
    update(id, data) {
        this.log.info('Update a page');
        data.moduleGroupId = id;
        return this.permissionModuleRepository.save(data);
    }
    // find permission module
    findAll(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.permissionModuleRepository.find(data);
        });
    }
    // permission module List
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
        condition.order = { sortOrder: 'ASC' };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.permissionModuleRepository.count(condition);
        }
        else {
            return this.permissionModuleRepository.find(condition);
        }
    }
    // delete page
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.permissionModuleRepository.delete(id);
        });
    }
};
PermissionModuleService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [PermissionModuleRepository_1.PermissionModuleRepository, Object])
], PermissionModuleService);
exports.PermissionModuleService = PermissionModuleService;
//# sourceMappingURL=PermissionModuleService.js.map