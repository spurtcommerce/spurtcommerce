"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductAttributePlugin1665134310790 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddProductAttributePlugin1665134310790 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'ProductAttribute',
                    slugName: 'product-attribute',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'Catalog',
                    pluginTimestamp: 1665134310790,
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/store-product-attributes~,~/api/attribute~,~api/attribute-group~,~/api/product-attributes~,~/api/vendor-product-attribute~,~/api/attribute/~,~/api/attribute/get-attribute/~,~/api/attribute-group/~,~/api/attribute-group~,~/api/attribute-group/get-attribute-group/~,~/api/product-attributes/~,~/api/product-attributes/product-detail/~,~/api/store-product-attributes/product-detail/~,~/api/vendor-product-attribute/vendor-product-attribute-list~,~/api/vendor-product-attribute/update-vendor-product/~,~/api/vendor-product-attribute/vendor-product-attribute-detail/~,~/api/vendor-product-attribute/attribute-group~',
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
exports.AddProductAttributePlugin1665134310790 = AddProductAttributePlugin1665134310790;
//# sourceMappingURL=1665134310790-AddProductAttributePlugin.js.map