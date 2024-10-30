"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerToGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CustomerToGroup_1 = require("../models/CustomerToGroup");
let CustomerToGroupRepository = class CustomerToGroupRepository extends typeorm_1.Repository {
};
CustomerToGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CustomerToGroup_1.CustomerToGroup)
], CustomerToGroupRepository);
exports.CustomerToGroupRepository = CustomerToGroupRepository;
//# sourceMappingURL=CustomerToGroupRepository.js.map