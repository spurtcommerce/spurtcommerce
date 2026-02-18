"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productVariantService = productVariantService;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
const ProductVarientOption_1 = require("./models/ProductVarientOption");
function productVariantService(method, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const productVariantRepo = (0, typeormLoader_1.getDataSource)().getRepository(ProductVarientOption_1.ProductVarientOption);
        if (method === 'find') {
            return yield productVariantRepo.find(payload);
        }
    });
}
//# sourceMappingURL=VariantHook.js.map