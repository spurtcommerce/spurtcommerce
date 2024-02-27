"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductvariantPlugin1665134686072 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddProductvariantPlugin1665134686072 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'ProductVariants',
                    slugName: 'product-variants',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginTimestamp: 1665134686072,
                    pluginType: 'Catalog',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/vendor-product-variants~,~/api/product-variants~,~/api/store-product-variants~,~/api/variants~,~/api/variants/~,~/api/variants/varients-detail~,~/api/product-variants/~,~/api/product-variants/product-detail/~,~/api/product-variants/product-varient-inventory-list~,~/api/product-variants/product-varient-update-stock~,~/api/product-variants/update-product-id-sku~,~/api/store-product-variants/product-detail/~,~/api/vendor-product-variants/vendor-product-list~,~/api/vendor-product-variants/update-vendor-product~,~/api/vendor-product-variants/vendor-product-detail/~,~/api/vendor-product-variants/vendor-product-variant-inventory-list~,~/api/vendor-product-variants/vendor-product-varient-update-stock~,~/api/vendor-product-variants/delete-vendor-product-varient-option/~,~/api/vendor-product-variants/variants~',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddProductvariantPlugin1665134686072 = AddProductvariantPlugin1665134686072;
//# sourceMappingURL=1665134686072-AddProductvariantPlugin.js.map