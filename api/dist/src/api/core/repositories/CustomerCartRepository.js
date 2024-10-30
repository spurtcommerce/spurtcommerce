"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCartRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CustomerCart_1 = require("../models/CustomerCart");
let CustomerCartRepository = class CustomerCartRepository extends typeorm_1.Repository {
};
CustomerCartRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CustomerCart_1.CustomerCart)
], CustomerCartRepository);
exports.CustomerCartRepository = CustomerCartRepository;
//# sourceMappingURL=CustomerCartRepository.js.map