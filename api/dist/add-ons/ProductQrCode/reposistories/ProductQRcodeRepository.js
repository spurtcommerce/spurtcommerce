"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQRcodeRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductQrcode_1 = require("../models/ProductQrcode");
let ProductQRcodeRepository = class ProductQRcodeRepository extends typeorm_1.Repository {
};
ProductQRcodeRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductQrcode_1.ProductQRcode)
], ProductQRcodeRepository);
exports.ProductQRcodeRepository = ProductQRcodeRepository;
//# sourceMappingURL=ProductQRcodeRepository.js.map