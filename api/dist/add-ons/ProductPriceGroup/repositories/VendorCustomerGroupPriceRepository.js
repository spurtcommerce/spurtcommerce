"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCustomerGroupPriceRepository = void 0;
const tslib_1 = require("tslib");
const VendorCustomerGroupPrice_1 = require("../models/VendorCustomerGroupPrice");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorCustomerGroupPriceRepository = class VendorCustomerGroupPriceRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorCustomerGroupPrice_1.VendorCustomerGroupPrice);
    }
};
exports.VendorCustomerGroupPriceRepository = VendorCustomerGroupPriceRepository;
exports.VendorCustomerGroupPriceRepository = VendorCustomerGroupPriceRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorCustomerGroupPriceRepository);
//# sourceMappingURL=VendorCustomerGroupPriceRepository.js.map