"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductRelatedPlugin1665134575737 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddProductRelatedPlugin1665134575737 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'ProductRelated',
                    slugName: 'product-related',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'Marketing',
                    pluginTimestamp: 1665134575737,
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/product-related~,~/api/list~,~/api/vendor-related-product~,~/api/product-related/update-product-related~,~/api/product-related/product-related-detail/~,~/api/product-related/product-list~,~/api/list/related-product-list~,~/api/vendor-related-product/update-vendor-related-product~,~/api/vendor-related-product/vendor-related-product-list~,~/api/vendor-related-product/vendor-related-product-details/~,',
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
exports.AddProductRelatedPlugin1665134575737 = AddProductRelatedPlugin1665134575737;
//# sourceMappingURL=1665134575737-AddProductRelatedPlugin.js.map