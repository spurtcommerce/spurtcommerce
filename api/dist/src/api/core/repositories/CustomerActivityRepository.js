"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerActivityRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CustomerActivity_1 = require("../models/CustomerActivity");
let CustomerActivityRepository = class CustomerActivityRepository extends typeorm_1.Repository {
};
CustomerActivityRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CustomerActivity_1.CustomerActivity)
], CustomerActivityRepository);
exports.CustomerActivityRepository = CustomerActivityRepository;
//# sourceMappingURL=CustomerActivityRepository.js.map