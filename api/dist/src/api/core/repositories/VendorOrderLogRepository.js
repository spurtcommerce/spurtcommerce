"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderLogRepository = void 0;
const tslib_1 = require("tslib");
const VendorOrderLog_1 = require("../models/VendorOrderLog");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorOrderLogRepository = class VendorOrderLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorOrderLog_1.VendorOrderLog);
    }
};
exports.VendorOrderLogRepository = VendorOrderLogRepository;
exports.VendorOrderLogRepository = VendorOrderLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorOrderLogRepository);
//# sourceMappingURL=VendorOrderLogRepository.js.map