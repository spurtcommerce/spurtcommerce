"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const BannerRepository_1 = require("../repositories/BannerRepository");
let BannerService = class BannerService {
    constructor(bannerRepository, log) {
        this.bannerRepository = bannerRepository;
        this.log = log;
    }
    // create banner
    create(banner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new banner ');
            return this.bannerRepository.save(banner);
        });
    }
    // find Condition
    findOne(banner) {
        return this.bannerRepository.findOne(banner);
    }
    // update banner
    update(banner) {
        return this.bannerRepository.save(banner);
    }
    // banner List
    list(limit, offset, select = [], relations = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.relations = [];
        if (relations && relations.length > 0) {
            relations.forEach((table) => {
                condition.relations.push(table.tableName);
            });
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
            return this.bannerRepository.count(condition);
        }
        else {
            return this.bannerRepository.find(condition);
        }
    }
    // delete banner
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.bannerRepository.delete(id);
        });
    }
};
BannerService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [BannerRepository_1.BannerRepository, Object])
], BannerService);
exports.BannerService = BannerService;
//# sourceMappingURL=BannerService.js.map