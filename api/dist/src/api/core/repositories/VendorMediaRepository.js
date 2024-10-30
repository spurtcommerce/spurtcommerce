"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorMediaRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorMedia_1 = require("../models/VendorMedia");
let VendorMediaRepository = class VendorMediaRepository extends typeorm_1.Repository {
};
VendorMediaRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorMedia_1.VendorMedia)
], VendorMediaRepository);
exports.VendorMediaRepository = VendorMediaRepository;
//# sourceMappingURL=VendorMediaRepository.js.map