"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelReasonRepository = void 0;
const tslib_1 = require("tslib");
const OrderCancelReason_1 = require("../models/OrderCancelReason");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let OrderCancelReasonRepository = class OrderCancelReasonRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(OrderCancelReason_1.OrderCancelReason);
    }
};
exports.OrderCancelReasonRepository = OrderCancelReasonRepository;
exports.OrderCancelReasonRepository = OrderCancelReasonRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], OrderCancelReasonRepository);
//# sourceMappingURL=OrderCancelReasonRepository.js.map