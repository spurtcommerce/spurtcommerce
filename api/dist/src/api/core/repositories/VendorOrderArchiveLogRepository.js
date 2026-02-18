"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderArchiveLogRepository = void 0;
const tslib_1 = require("tslib");
const VendorOrderArchiveLog_1 = require("../models/VendorOrderArchiveLog");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorOrderArchiveLogRepository = class VendorOrderArchiveLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorOrderArchiveLog_1.VendorOrderArchiveLog);
    }
};
exports.VendorOrderArchiveLogRepository = VendorOrderArchiveLogRepository;
exports.VendorOrderArchiveLogRepository = VendorOrderArchiveLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorOrderArchiveLogRepository);
//# sourceMappingURL=VendorOrderArchiveLogRepository.js.map