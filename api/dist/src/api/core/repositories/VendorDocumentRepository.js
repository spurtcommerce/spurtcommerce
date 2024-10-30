"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocumentRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorDocument_1 = require("../models/VendorDocument");
let VendorDocumentRepository = class VendorDocumentRepository extends typeorm_1.Repository {
};
VendorDocumentRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorDocument_1.VendorDocument)
], VendorDocumentRepository);
exports.VendorDocumentRepository = VendorDocumentRepository;
//# sourceMappingURL=VendorDocumentRepository.js.map