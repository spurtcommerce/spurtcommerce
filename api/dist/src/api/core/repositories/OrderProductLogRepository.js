"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductLogRepository = void 0;
const tslib_1 = require("tslib");
const OrderProductLog_1 = require("../models/OrderProductLog");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let OrderProductLogRepository = class OrderProductLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(OrderProductLog_1.OrderProductLog);
    }
};
exports.OrderProductLogRepository = OrderProductLogRepository;
exports.OrderProductLogRepository = OrderProductLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], OrderProductLogRepository);
//# sourceMappingURL=OrderProductLogRepository.js.map