"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const VendorPriceGroupRepository_1 = require("../repositories/VendorPriceGroupRepository");
const typeorm_1 = require("typeorm");
let VendorPriceGroupService = class VendorPriceGroupService {
    constructor(vendorPriceGroupRepository) {
        this.vendorPriceGroupRepository = vendorPriceGroupRepository;
    }
    // find seller price group
    findOne(findCondition) {
        return this.vendorPriceGroupRepository.repository.findOne(findCondition);
    }
    // seller list price group
    list(limit = 0, offset = 0, select = [], relation = [], whereConditions = [], searchCondition, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            const tblJoins = {};
            relation.forEach((tbl) => {
                tblJoins[tbl.name] = tbl.relationDef;
            });
            condition.join = {
                alias: 'sellerPriceGroup',
                leftJoinAndSelect: tblJoins,
            };
        }
        condition.where = (qb) => {
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((item) => {
                    if (item.op === 'where') {
                        qb.where(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'and') {
                        qb.andWhere(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'or') {
                        qb.orWhere(`${item.name} = ${item.value}`);
                    }
                    else if (item.op === 'In') {
                        qb.andWhere(`${item.name} IN (${item.value})`);
                    }
                    else if (item.op === 'raw') {
                        qb.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                    }
                });
            }
            if ((searchCondition === null || searchCondition === void 0 ? void 0 : searchCondition.length) > 0) {
                searchCondition.forEach((table) => {
                    if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            qb.andWhere(new typeorm_1.Brackets(subqb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value, subIndex) => {
                                    if (subIndex === 0) {
                                        subqb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                        return;
                                    }
                                    subqb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                });
                            }));
                        });
                    }
                    else if (table.name && table.name instanceof Array && table.name.length > 0) {
                        qb.andWhere(new typeorm_1.Brackets(subqb => {
                            const namesArray = table.name;
                            namesArray.forEach((name, index) => {
                                if (index === 0) {
                                    subqb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                    return;
                                }
                                subqb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                            });
                        }));
                    }
                    else if (table.value && table.value instanceof Array && table.value.length > 0) {
                        qb.andWhere(new typeorm_1.Brackets(subqb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value, index) => {
                                if (index === 0) {
                                    subqb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                subqb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    }
                });
            }
        };
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorPriceGroupRepository.repository.count(condition);
        }
        else {
            return this.vendorPriceGroupRepository.repository.find(condition);
        }
    }
    save(payload) {
        return this.vendorPriceGroupRepository.repository.save(payload);
    }
    create(payload) {
        return this.vendorPriceGroupRepository.repository.save(payload);
    }
    // soft delete price group
    softDelete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.vendorPriceGroupRepository.repository.update(id, { isDelete: 1 });
            return newUser;
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.vendorPriceGroupRepository.repository.delete(id);
        });
    }
    // bulk price group
    bulkDelete(ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.vendorPriceGroupRepository.repository.update({ id: (0, typeorm_1.In)(ids) }, { isActive: 0, isDelete: 1 });
        });
    }
    // find price group
    find(findCondition) {
        return this.vendorPriceGroupRepository.repository.find(findCondition);
    }
};
exports.VendorPriceGroupService = VendorPriceGroupService;
exports.VendorPriceGroupService = VendorPriceGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [VendorPriceGroupRepository_1.VendorPriceGroupRepository])
], VendorPriceGroupService);
//# sourceMappingURL=VendorPriceGroupService.js.map