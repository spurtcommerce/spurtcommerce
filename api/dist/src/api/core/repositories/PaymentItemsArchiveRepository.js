"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentItemsArchiveRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PaymentItemsArchive_1 = require("../models/PaymentItemsArchive");
let PaymentItemsArchiveRepository = class PaymentItemsArchiveRepository extends typeorm_1.Repository {
};
PaymentItemsArchiveRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PaymentItemsArchive_1.PaymentItemsArchive)
], PaymentItemsArchiveRepository);
exports.PaymentItemsArchiveRepository = PaymentItemsArchiveRepository;
//# sourceMappingURL=PaymentItemsArchiveRepository.js.map