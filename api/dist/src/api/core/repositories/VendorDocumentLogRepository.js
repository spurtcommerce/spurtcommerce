"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocumentLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorDocumentLog_1 = require("../models/VendorDocumentLog");
let VendorDocumentLogRepository = class VendorDocumentLogRepository extends typeorm_1.Repository {
};
VendorDocumentLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorDocumentLog_1.VendorDocumentLog)
], VendorDocumentLogRepository);
exports.VendorDocumentLogRepository = VendorDocumentLogRepository;
//# sourceMappingURL=VendorDocumentLogRepository.js.map