"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocumentLogRepository = void 0;
const tslib_1 = require("tslib");
const VendorDocumentLog_1 = require("../models/VendorDocumentLog");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorDocumentLogRepository = class VendorDocumentLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorDocumentLog_1.VendorDocumentLog);
    }
};
exports.VendorDocumentLogRepository = VendorDocumentLogRepository;
exports.VendorDocumentLogRepository = VendorDocumentLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorDocumentLogRepository);
//# sourceMappingURL=VendorDocumentLogRepository.js.map