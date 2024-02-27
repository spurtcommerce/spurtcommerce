"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductVariantMenu1654598244859 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddProductVariantMenu1654598244859 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ProductVariantSeed = [
                {
                    menuName: 'Product Variants',
                    menuModule: 'Catalog Manage Products',
                    path: '#/catalog/manage-products/product_variant',
                    icon: '',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('PluginMenu').save(ProductVariantSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddProductVariantMenu1654598244859 = AddProductVariantMenu1654598244859;
//# sourceMappingURL=1654598244859-AddProductVariantMenu.js.map