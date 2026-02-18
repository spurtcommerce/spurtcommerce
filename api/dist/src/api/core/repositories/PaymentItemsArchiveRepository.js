"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentItemsArchiveRepository = void 0;
const tslib_1 = require("tslib");
const PaymentItemsArchive_1 = require("../models/PaymentItemsArchive");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let PaymentItemsArchiveRepository = class PaymentItemsArchiveRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PaymentItemsArchive_1.PaymentItemsArchive);
    }
};
exports.PaymentItemsArchiveRepository = PaymentItemsArchiveRepository;
exports.PaymentItemsArchiveRepository = PaymentItemsArchiveRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PaymentItemsArchiveRepository);
//# sourceMappingURL=PaymentItemsArchiveRepository.js.map