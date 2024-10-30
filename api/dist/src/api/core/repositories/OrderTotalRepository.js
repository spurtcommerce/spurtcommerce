"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTotalRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const OrderTotal_1 = require("../models/OrderTotal");
let OrderTotalRepository = class OrderTotalRepository extends typeorm_1.Repository {
};
OrderTotalRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(OrderTotal_1.OrderTotal)
], OrderTotalRepository);
exports.OrderTotalRepository = OrderTotalRepository;
//# sourceMappingURL=OrderTotalRepository.js.map