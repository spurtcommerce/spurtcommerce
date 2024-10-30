"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentArchiveRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PaymentArchive_1 = require("../models/PaymentArchive");
let PaymentArchiveRepository = class PaymentArchiveRepository extends typeorm_1.Repository {
};
PaymentArchiveRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PaymentArchive_1.PaymentArchive)
], PaymentArchiveRepository);
exports.PaymentArchiveRepository = PaymentArchiveRepository;
//# sourceMappingURL=PaymentArchiveRepository.js.map