"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorContactRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorContact_1 = require("../models/VendorContact");
let VendorContactRepository = class VendorContactRepository extends typeorm_1.Repository {
};
VendorContactRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorContact_1.VendorContact)
], VendorContactRepository);
exports.VendorContactRepository = VendorContactRepository;
//# sourceMappingURL=VendorContactRepository.js.map