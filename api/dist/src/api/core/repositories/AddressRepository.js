"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Address_1 = require("../models/Address");
let AddressRepository = class AddressRepository extends typeorm_1.Repository {
};
AddressRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Address_1.Address)
], AddressRepository);
exports.AddressRepository = AddressRepository;
//# sourceMappingURL=AddressRepository.js.map