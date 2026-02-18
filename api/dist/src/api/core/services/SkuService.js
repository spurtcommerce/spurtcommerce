"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../decorators/Logger");
const SkuRepository_1 = require("../repositories/SkuRepository");
const typeorm_1 = require("typeorm");
let SkuService = class SkuService {
    constructor(skuRepository, log) {
        this.skuRepository = skuRepository;
        this.log = log;
    }
    // find one condition
    findOne(sku) {
        return this.skuRepository.repository.findOne(sku);
    }
    // find all sku
    findAll(sku) {
        this.log.info('Find all sku');
        return this.skuRepository.repository.find(sku);
    }
    // list
    list(limit, offset, select = [], relation = [], whereConditions = [], count) {
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
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
            });
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.skuRepository.repository.count(condition);
        }
        else {
            return this.skuRepository.repository.find(condition);
        }
    }
    // create sku
    create(sku) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newSku = yield this.skuRepository.repository.save(sku);
            return newSku;
        });
    }
    // update sku
    update(id, sku) {
        this.log.info('Update a sku');
        sku.id = id;
        return this.skuRepository.repository.save(sku);
    }
    // delete sku
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a sku');
            const newSku = yield this.skuRepository.repository.delete(id);
            return newSku;
        });
    }
    bulkDelete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a sku');
            const newSku = yield this.skuRepository.repository.delete(id);
            return newSku;
        });
    }
};
exports.SkuService = SkuService;
exports.SkuService = SkuService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [SkuRepository_1.SkuRepository, Object])
], SkuService);
//# sourceMappingURL=SkuService.js.map