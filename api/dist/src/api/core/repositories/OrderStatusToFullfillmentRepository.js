"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusToFullfillmentRepository = void 0;
const tslib_1 = require("tslib");
const OrderStatusToFullfillment_1 = require("../models/OrderStatusToFullfillment");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let OrderStatusToFullfillmentRepository = class OrderStatusToFullfillmentRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(OrderStatusToFullfillment_1.OrderStatusToFullfillment);
    }
};
exports.OrderStatusToFullfillmentRepository = OrderStatusToFullfillmentRepository;
exports.OrderStatusToFullfillmentRepository = OrderStatusToFullfillmentRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], OrderStatusToFullfillmentRepository);
//# sourceMappingURL=OrderStatusToFullfillmentRepository.js.map