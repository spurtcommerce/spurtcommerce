"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorMediaRepository = void 0;
const tslib_1 = require("tslib");
const VendorMedia_1 = require("../models/VendorMedia");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorMediaRepository = class VendorMediaRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorMedia_1.VendorMedia);
    }
};
exports.VendorMediaRepository = VendorMediaRepository;
exports.VendorMediaRepository = VendorMediaRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorMediaRepository);
//# sourceMappingURL=VendorMediaRepository.js.map