"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVariantsPlugin1714110125130 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class UpdateVariantsPlugin1714110125130 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-variants',
                },
            });
            if (plugin) {
                plugin.routes = '~/api/vendor-product-variants~,~/api/product-variants~,~/api/store-product-variants~,~/api/variants~,~/api/variants/~,~/api/variants/varients-detail~,~/api/product-variants/~,~/api/product-variants/product-detail/~,~/api/product-variants/product-varient-inventory-list~,~/api/product-variants/product-varient-update-stock~,~/api/product-variants/update-product-id-sku~,~/api/store-product-variants/product-detail/~,~/api/vendor-product-variants/vendor-product-list~,~/api/vendor-product-variants/update-vendor-product~,~/api/vendor-product-variants/vendor-product-detail/~,~/api/vendor-product-variants/vendor-product-variant-inventory-list~,~/api/vendor-product-variants/vendor-product-varient-update-stock~,~/api/vendor-product-variants/delete-vendor-product-varient-option/~,~/api/vendor-product-variants/variants~,~/api/variant-translation/variant~,~/api/variant-translation/variant/~,~/api/product-variant~,~/api/product-variant/~,~/api/product-variant/product/~,~/api/product-variant/inventory~,~/api/product-variant/stock~,~/api/product-variant/sku~,~/api/product-variant/variant-option/~,~/api/variant~,~/api/variant/~,~/api/store-product-variant~,~/api/store-product-variant/product/~';
                yield repo.save(plugin);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateVariantsPlugin1714110125130 = UpdateVariantsPlugin1714110125130;
//# sourceMappingURL=1714110125130-UpdateVariantsPlugin.js.map