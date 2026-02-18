"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTotalService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../decorators/Logger");
const OrderTotalRepository_1 = require("../repositories/OrderTotalRepository");
let OrderTotalService = class OrderTotalService {
    constructor(orderTotalRepository, log) {
        this.orderTotalRepository = orderTotalRepository;
        this.log = log;
    }
    // create order total data
    createOrderTotalData(orderTotalData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a order total data');
            return this.orderTotalRepository.repository.save(orderTotalData);
        });
    }
};
exports.OrderTotalService = OrderTotalService;
exports.OrderTotalService = OrderTotalService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderTotalRepository_1.OrderTotalRepository, Object])
], OrderTotalService);
//# sourceMappingURL=OrderTotalService.js.map