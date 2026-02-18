"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentItemsRepository = void 0;
const tslib_1 = require("tslib");
const PaymentItems_1 = require("../models/PaymentItems");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let PaymentItemsRepository = class PaymentItemsRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PaymentItems_1.PaymentItems);
    }
};
exports.PaymentItemsRepository = PaymentItemsRepository;
exports.PaymentItemsRepository = PaymentItemsRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PaymentItemsRepository);
//# sourceMappingURL=PaymentItemsRepository.js.map