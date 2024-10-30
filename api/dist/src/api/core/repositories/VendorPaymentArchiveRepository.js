"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPaymentArchiveRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorPaymentArchive_1 = require("../models/VendorPaymentArchive");
let VendorPaymentArchiveRepository = class VendorPaymentArchiveRepository extends typeorm_1.Repository {
};
VendorPaymentArchiveRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorPaymentArchive_1.VendorPaymentArchive)
], VendorPaymentArchiveRepository);
exports.VendorPaymentArchiveRepository = VendorPaymentArchiveRepository;
//# sourceMappingURL=VendorPaymentArchiveRepository.js.map