"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentArchiveRepository = void 0;
const tslib_1 = require("tslib");
const PaymentArchive_1 = require("../models/PaymentArchive");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let PaymentArchiveRepository = class PaymentArchiveRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PaymentArchive_1.PaymentArchive);
    }
};
exports.PaymentArchiveRepository = PaymentArchiveRepository;
exports.PaymentArchiveRepository = PaymentArchiveRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PaymentArchiveRepository);
//# sourceMappingURL=PaymentArchiveRepository.js.map