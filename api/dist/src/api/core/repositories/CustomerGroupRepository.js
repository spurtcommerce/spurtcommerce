"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroupRepository = void 0;
const tslib_1 = require("tslib");
const CustomerGroup_1 = require("../models/CustomerGroup");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let CustomerGroupRepository = class CustomerGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(CustomerGroup_1.CustomerGroup);
    }
};
exports.CustomerGroupRepository = CustomerGroupRepository;
exports.CustomerGroupRepository = CustomerGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], CustomerGroupRepository);
//# sourceMappingURL=CustomerGroupRepository.js.map