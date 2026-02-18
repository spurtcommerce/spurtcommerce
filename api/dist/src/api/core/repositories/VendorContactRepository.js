"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorContactRepository = void 0;
const tslib_1 = require("tslib");
const VendorContact_1 = require("../models/VendorContact");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorContactRepository = class VendorContactRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorContact_1.VendorContact);
    }
};
exports.VendorContactRepository = VendorContactRepository;
exports.VendorContactRepository = VendorContactRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorContactRepository);
//# sourceMappingURL=VendorContactRepository.js.map