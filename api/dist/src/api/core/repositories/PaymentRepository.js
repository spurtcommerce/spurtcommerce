"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const tslib_1 = require("tslib");
const Payment_1 = require("../models/Payment");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let PaymentRepository = class PaymentRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Payment_1.Payment);
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PaymentRepository);
//# sourceMappingURL=PaymentRepository.js.map