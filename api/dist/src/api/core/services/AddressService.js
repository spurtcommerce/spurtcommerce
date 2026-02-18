"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../decorators/Logger");
const AddressRepository_1 = require("../repositories/AddressRepository");
let AddressService = class AddressService {
    constructor(addressRepository, log) {
        this.addressRepository = addressRepository;
        this.log = log;
    }
    // create address
    create(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new address ');
            return this.addressRepository.repository.save(address);
        });
    }
    // find Condition
    findOne(address) {
        return this.addressRepository.repository.findOne(address);
    }
    // update address
    update(id, address) {
        address.addressId = id;
        return this.addressRepository.repository.save(address);
    }
    // address List
    list(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], relations = [], whereConditions = [], count) {
            const condition = {};
            condition.where = {};
            if (select && select.length > 0) {
                condition.select = select;
            }
            if (relations && relations.length > 0) {
                condition.relations = relations;
            }
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
                return this.addressRepository.repository.count(condition);
            }
            else {
                return this.addressRepository.repository.find(condition);
            }
        });
    }
    // delete address
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.addressRepository.repository.delete(id);
            return 1;
        });
    }
    // find Customer addresses
    find(address) {
        return this.addressRepository.repository.find(address);
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [AddressRepository_1.AddressRepository, Object])
], AddressService);
//# sourceMappingURL=AddressService.js.map