"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CustomerGroup_1 = require("../models/CustomerGroup");
let CustomerGroupRepository = class CustomerGroupRepository extends typeorm_1.Repository {
};
CustomerGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CustomerGroup_1.CustomerGroup)
], CustomerGroupRepository);
exports.CustomerGroupRepository = CustomerGroupRepository;
//# sourceMappingURL=CustomerGroupRepository.js.map