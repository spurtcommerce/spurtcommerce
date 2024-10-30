"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusToFullfillmentService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const OrderStatusToFullfillmentRepository_1 = require("../repositories/OrderStatusToFullfillmentRepository");
let OrderStatusToFullfillmentService = class OrderStatusToFullfillmentService {
    constructor(orderStatusToFullfillmentRepository, log) {
        this.orderStatusToFullfillmentRepository = orderStatusToFullfillmentRepository;
        this.log = log;
    }
    // create payload
    create(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new payload ');
            return this.orderStatusToFullfillmentRepository.save(payload);
        });
    }
    // find One payload
    findOne(payload) {
        return this.orderStatusToFullfillmentRepository.findOne(payload);
    }
    // findAll payload
    findAll(payload) {
        return this.orderStatusToFullfillmentRepository.find(payload);
    }
    // update payload
    update(payload) {
        return this.orderStatusToFullfillmentRepository.save(payload);
    }
    // delete payload
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderStatusToFullfillmentRepository.delete(id);
        });
    }
};
OrderStatusToFullfillmentService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderStatusToFullfillmentRepository_1.OrderStatusToFullfillmentRepository, Object])
], OrderStatusToFullfillmentService);
exports.OrderStatusToFullfillmentService = OrderStatusToFullfillmentService;
//# sourceMappingURL=OrderStatusToFullfillmentService.js.map