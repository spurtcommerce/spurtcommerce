"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFulfillmentStatusRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const OrderFullfillmentStatus_1 = require("../models/OrderFullfillmentStatus");
let OrderFulfillmentStatusRepository = class OrderFulfillmentStatusRepository extends typeorm_1.Repository {
};
OrderFulfillmentStatusRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(OrderFullfillmentStatus_1.OrderFullfillmentStatus)
], OrderFulfillmentStatusRepository);
exports.OrderFulfillmentStatusRepository = OrderFulfillmentStatusRepository;
//# sourceMappingURL=OrderFullfillmentStatusRepository.js.map