"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Payment_1 = require("../models/Payment");
let PaymentRepository = class PaymentRepository extends typeorm_1.Repository {
};
PaymentRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Payment_1.Payment)
], PaymentRepository);
exports.PaymentRepository = PaymentRepository;
//# sourceMappingURL=PaymentRepository.js.map