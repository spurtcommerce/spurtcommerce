"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLogRepository = void 0;
const tslib_1 = require("tslib");
const OrderLog_1 = require("../models/OrderLog");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let OrderLogRepository = class OrderLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(OrderLog_1.OrderLog);
    }
};
exports.OrderLogRepository = OrderLogRepository;
exports.OrderLogRepository = OrderLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], OrderLogRepository);
//# sourceMappingURL=OrderLogRepository.js.map