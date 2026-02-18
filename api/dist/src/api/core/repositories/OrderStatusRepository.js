"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusRepository = void 0;
const tslib_1 = require("tslib");
const OrderStatus_1 = require("../models/OrderStatus");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let OrderStatusRepository = class OrderStatusRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(OrderStatus_1.OrderStatus);
    }
};
exports.OrderStatusRepository = OrderStatusRepository;
exports.OrderStatusRepository = OrderStatusRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], OrderStatusRepository);
//# sourceMappingURL=OrderStatusRepository.js.map