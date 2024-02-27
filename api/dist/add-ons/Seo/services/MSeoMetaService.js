"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSeoMetaService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const index_1 = require("typeorm/index");
const MSeoMetaRepository_1 = require("../repositories/MSeoMetaRepository");
let MSeoMetaService = class MSeoMetaService {
    constructor(mSeoMetaRepository, log) {
        this.mSeoMetaRepository = mSeoMetaRepository;
        this.log = log;
    }
    // create seo
    create(seo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new seo ');
            return this.mSeoMetaRepository.save(seo);
        });
    }
    // find Condition
    findOne(seo) {
        return this.mSeoMetaRepository.findOne(seo);
    }
    // update seo
    update(id, seo) {
        this.log.info('Update a Seo');
        seo.SeoId = id;
        return this.mSeoMetaRepository.save(seo);
    }
    // seo List
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
        condition.order = {};
        if (count) {
            return this.mSeoMetaRepository.count(condition);
        }
        else {
            return this.mSeoMetaRepository.find(condition);
        }
    }
    // delete seo
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.mSeoMetaRepository.delete(id);
        });
    }
    escapeChar(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const val = data
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/,/g, '&sbquo;')
                .replace(/=/g, '&#61;')
                .replace(/-/g, '&#45;')
                .replace(/…/g, '&hellip;')
                .replace(/@/g, '&commat;')
                .replace(/©/g, '&copy;')
                .replace(/#/g, '&#35;')
                .replace(/“/g, '&ldquo;')
                .replace(/’/g, '&rsquo;')
                .replace(/‘/g, '&lsquo;')
                .replace(/™/g, '&trade;')
                .replace(/®/g, '&reg;')
                .replace(/–/g, '&ndash;')
                .replace(/é/g, '&eacute;')
                .replace(/€/g, '&euro;')
                .replace(/£/g, '&pound;');
            return val;
        });
    }
};
MSeoMetaService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [MSeoMetaRepository_1.MSeoMetaRepository, Object])
], MSeoMetaService);
exports.MSeoMetaService = MSeoMetaService;
//# sourceMappingURL=MSeoMetaService.js.map