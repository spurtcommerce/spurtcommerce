"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQRcodeRepository = void 0;
const tslib_1 = require("tslib");
const ProductQrcode_1 = require("../models/ProductQrcode");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductQRcodeRepository = class ProductQRcodeRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductQrcode_1.ProductQRcode);
    }
};
exports.ProductQRcodeRepository = ProductQRcodeRepository;
exports.ProductQRcodeRepository = ProductQRcodeRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductQRcodeRepository);
//# sourceMappingURL=ProductQRcodeRepository.js.map