"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusToFullfillmentRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const OrderStatusToFullfillment_1 = require("../models/OrderStatusToFullfillment");
let OrderStatusToFullfillmentRepository = class OrderStatusToFullfillmentRepository extends typeorm_1.Repository {
};
OrderStatusToFullfillmentRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(OrderStatusToFullfillment_1.OrderStatusToFullfillment)
], OrderStatusToFullfillmentRepository);
exports.OrderStatusToFullfillmentRepository = OrderStatusToFullfillmentRepository;
//# sourceMappingURL=OrderStatusToFullfillmentRepository.js.map