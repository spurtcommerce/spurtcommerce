"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCustomerPriceRepository = void 0;
const tslib_1 = require("tslib");
const VendorCustomerPrice_1 = require("../models/VendorCustomerPrice");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorCustomerPriceRepository = class VendorCustomerPriceRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorCustomerPrice_1.VendorCustomerPrice);
    }
};
exports.VendorCustomerPriceRepository = VendorCustomerPriceRepository;
exports.VendorCustomerPriceRepository = VendorCustomerPriceRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorCustomerPriceRepository);
//# sourceMappingURL=VendorCustomerPriceRepository.js.map