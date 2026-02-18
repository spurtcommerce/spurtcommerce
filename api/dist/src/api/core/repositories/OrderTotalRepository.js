"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTotalRepository = void 0;
const tslib_1 = require("tslib");
const OrderTotal_1 = require("../models/OrderTotal");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let OrderTotalRepository = class OrderTotalRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(OrderTotal_1.OrderTotal);
    }
};
exports.OrderTotalRepository = OrderTotalRepository;
exports.OrderTotalRepository = OrderTotalRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], OrderTotalRepository);
//# sourceMappingURL=OrderTotalRepository.js.map