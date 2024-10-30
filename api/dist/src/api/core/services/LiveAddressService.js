"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveAddressService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const LiveAddressRepository_1 = require("../repositories/LiveAddressRepository");
let LiveAddressService = class LiveAddressService {
    constructor(liveAddressRepository) {
        this.liveAddressRepository = liveAddressRepository;
    }
    // create address
    create(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.liveAddressRepository.save(address);
        });
    }
    // find Condition
    findOne(address) {
        return this.liveAddressRepository.findOne(address);
    }
    // update address
    update(id, address) {
        address.id = id;
        return this.liveAddressRepository.save(address);
    }
    // delete address
    delete(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.liveAddressRepository.delete(address);
        });
    }
    // find Customer addresses
    find(address) {
        return this.liveAddressRepository.find(address);
    }
    // address List
    list(limit, offset, whereConditions = [], count) {
        const condition = {};
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
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
            return this.liveAddressRepository.count(condition);
        }
        else {
            return this.liveAddressRepository.find(condition);
        }
    }
};
LiveAddressService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [LiveAddressRepository_1.LiveAddressRepository])
], LiveAddressService);
exports.LiveAddressService = LiveAddressService;
//# sourceMappingURL=LiveAddressService.js.map