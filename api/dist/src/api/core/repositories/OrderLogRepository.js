"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const OrderLog_1 = require("../models/OrderLog");
let OrderLogRepository = class OrderLogRepository extends typeorm_1.Repository {
};
OrderLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(OrderLog_1.OrderLog)
], OrderLogRepository);
exports.OrderLogRepository = OrderLogRepository;
//# sourceMappingURL=OrderLogRepository.js.map