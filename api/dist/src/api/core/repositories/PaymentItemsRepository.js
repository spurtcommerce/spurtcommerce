"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentItemsRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PaymentItems_1 = require("../models/PaymentItems");
let PaymentItemsRepository = class PaymentItemsRepository extends typeorm_1.Repository {
};
PaymentItemsRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PaymentItems_1.PaymentItems)
], PaymentItemsRepository);
exports.PaymentItemsRepository = PaymentItemsRepository;
//# sourceMappingURL=PaymentItemsRepository.js.map