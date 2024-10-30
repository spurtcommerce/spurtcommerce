"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderArchiveLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorOrderArchiveLog_1 = require("../models/VendorOrderArchiveLog");
let VendorOrderArchiveLogRepository = class VendorOrderArchiveLogRepository extends typeorm_1.Repository {
};
VendorOrderArchiveLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorOrderArchiveLog_1.VendorOrderArchiveLog)
], VendorOrderArchiveLogRepository);
exports.VendorOrderArchiveLogRepository = VendorOrderArchiveLogRepository;
//# sourceMappingURL=VendorOrderArchiveLogRepository.js.map