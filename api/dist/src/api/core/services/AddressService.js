"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
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
            return this.addressRepository.save(address);
        });
    }
    // find Condition
    findOne(address) {
        return this.addressRepository.findOne(address);
    }
    // update address
    update(id, address) {
        address.addressId = id;
        return this.addressRepository.save(address);
    }
    // address List
    list(limit, offset, select = [], relations = [], whereConditions = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                return this.addressRepository.count(condition);
            }
            else {
                return this.addressRepository.find(condition);
            }
        });
    }
    // delete address
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.addressRepository.delete(id);
            return 1;
        });
    }
    // find Customer addresses
    find(address) {
        return this.addressRepository.find(address);
    }
};
AddressService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [AddressRepository_1.AddressRepository, Object])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=AddressService.js.map