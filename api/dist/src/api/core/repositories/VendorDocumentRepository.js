"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocumentRepository = void 0;
const tslib_1 = require("tslib");
const VendorDocument_1 = require("../models/VendorDocument");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorDocumentRepository = class VendorDocumentRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorDocument_1.VendorDocument);
    }
};
exports.VendorDocumentRepository = VendorDocumentRepository;
exports.VendorDocumentRepository = VendorDocumentRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorDocumentRepository);
//# sourceMappingURL=VendorDocumentRepository.js.map