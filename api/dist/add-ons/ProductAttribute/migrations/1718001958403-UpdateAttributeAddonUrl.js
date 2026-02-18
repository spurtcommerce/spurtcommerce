"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttributeAddonUrl1718001958403 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class UpdateAttributeAddonUrl1718001958403 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository('Plugins');
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-attribute',
                },
            });
            if (plugin) {
                plugin.routes = '~/api/store-product-attributes/product/~,~/api/attribute~,~/api/product-attributes~,~/api/vendor-product-attribute~,~/api/attribute/~,~/api/attribute/get-attribute/~,~/api/attribute-group/~,~/api/attribute-group~,~/api/attribute-group/get-attribute-group/~,~/api/product-attributes/~,~/api/product-attributes/product-detail/~,~/api/store-product-attributes/product-detail/~,~/api/vendor-product-attribute/vendor-product-attribute-list~,~/api/vendor-product-attribute/update-vendor-product/~,~/api/vendor-product-attribute/vendor-product-attribute-detail/~,~/api/vendor-product-attribute/attribute-group~,~/api/vendor-product-specification/product/~,~/api/vendor-product-specification/products~,~/api/vendor-product-specification~,~/api/vendor-product-specification/attribute-slug/product/~,~/api/specification-translation/specification/~,~/api/specification-translation/specification~,~/api/attribute-group-translation/attribute-group/~,~/api/attribute-group-translation/attribute-group~,~/api/attribute-translation/attribute~,~/api/attribute-translation/attribute/~,~/api/product-specification/attribute-slug/product/~,~/api/product-specification/products~,~/api/product-specification/product/~,~/api/product-specification~,~/api/specification~,~/api/specification/~,~/api/specification/category~,~/api/specification/~,~/api/vendor-specification~,~/api/vendor-specification/~';
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
exports.UpdateAttributeAddonUrl1718001958403 = UpdateAttributeAddonUrl1718001958403;
//# sourceMappingURL=1718001958403-UpdateAttributeAddonUrl.js.map