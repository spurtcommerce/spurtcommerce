"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupScheduleRepository = void 0;
const tslib_1 = require("tslib");
const VendorPriceGroupSchedule_1 = require("../models/VendorPriceGroupSchedule");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorPriceGroupScheduleRepository = class VendorPriceGroupScheduleRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorPriceGroupSchedule_1.VendorPriceGroupSchedule);
    }
};
exports.VendorPriceGroupScheduleRepository = VendorPriceGroupScheduleRepository;
exports.VendorPriceGroupScheduleRepository = VendorPriceGroupScheduleRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorPriceGroupScheduleRepository);
//# sourceMappingURL=VendorPriceGroupScheduleRepository.js.map