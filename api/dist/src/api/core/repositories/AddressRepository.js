"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const tslib_1 = require("tslib");
const Address_1 = require("../models/Address");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let AddressRepository = class AddressRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Address_1.Address);
    }
};
exports.AddressRepository = AddressRepository;
exports.AddressRepository = AddressRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AddressRepository);
//# sourceMappingURL=AddressRepository.js.map