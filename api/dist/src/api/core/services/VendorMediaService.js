"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorMediaService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const typeorm_1 = require("typeorm");
const VendorMediaRepository_1 = require("../repositories/VendorMediaRepository");
let VendorMediaService = class VendorMediaService {
    constructor(vendorMediaRepository, log) {
        this.vendorMediaRepository = vendorMediaRepository;
        this.log = log;
    }
    // find one condition
    findOne(data) {
        return this.vendorMediaRepository.findOne(data);
    }
    // find all
    findAll(data) {
        this.log.info('Find all');
        return this.vendorMediaRepository.find(data);
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
            return this.vendorMediaRepository.count(condition);
        }
        else {
            return this.vendorMediaRepository.find(condition);
        }
    }
    // create
    create(mediaData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVarient = yield this.vendorMediaRepository.save(mediaData);
            return newVarient;
        });
    }
    // update
    update(id, mediaData) {
        this.log.info('Update vendor media');
        mediaData.id = id;
        return this.vendorMediaRepository.save(mediaData);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete vendor media');
            const newVideo = yield this.vendorMediaRepository.delete(id);
            return newVideo;
        });
    }
};
VendorMediaService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorMediaRepository_1.VendorMediaRepository, Object])
], VendorMediaService);
exports.VendorMediaService = VendorMediaService;
//# sourceMappingURL=VendorMediaService.js.map