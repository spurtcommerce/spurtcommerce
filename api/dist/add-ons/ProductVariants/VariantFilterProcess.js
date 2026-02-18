"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantProcess = variantProcess;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
const ProductVarientOption_1 = require("./models/ProductVarientOption");
function variantProcess(variant) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const subQb = (0, typeormLoader_1.getDataSource)()
            .getRepository(ProductVarientOption_1.ProductVarientOption)
            .createQueryBuilder('PVO');
        subQb.select(['DISTINCT(`PVO`.`product_id`)']);
        subQb.innerJoin('PVO.productVarientOptionDetail', 'PVOD');
        subQb.innerJoin('PVOD.variantValue', 'VV');
        subQb.innerJoin('VV.variant', 'V');
        subQb.where('PVO.is_active = ' + 1 + ' ');
        variant.forEach((data, subIndex) => {
            if (subIndex === 0) {
                subQb.andWhere('LOWER(V.name) = ' + '"' + data.name + '" AND LOWER(VV.value_name) = ' + '"' + data.value + '"');
                return;
            }
            subQb.orWhere('LOWER(V.name) = ' + '"' + data.name + '" AND LOWER(VV.value_name) = ' + '"' + data.value + '"');
        });
        return subQb.getSql();
    });
}
//# sourceMappingURL=VariantFilterProcess.js.map