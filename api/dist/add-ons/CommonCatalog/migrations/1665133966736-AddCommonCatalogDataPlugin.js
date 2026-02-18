"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommonCatalogDataPlugin1665133966736 = void 0;
const tslib_1 = require("tslib");
const moment = require("moment/moment");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddCommonCatalogDataPlugin1665133966736 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'CommonCatalog',
                    slugName: 'common-catalog',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'Marketplace',
                    pluginTimestamp: 1665133966736,
                    displayName: 'Common Products',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/admin-common-product~,~/api/admin-common-product/~,~api/store-common-product~,~api/vendor-common-product~,~/api/admin-common-product/get-related-vendors~,~/api/admin-common-product/update-reuse-status/~,~/api/admin-common-product/common-product-count~,~/api/store-common-product/common-product-list/~,~/api/store-common-product/vendor-count/~,~/api/vendor-common-product/common-product-list~,~/api/vendor-common-product/set-vendor-common-product~,~/api/vendor-common-product/delete/vendor-common-product/~',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddCommonCatalogDataPlugin1665133966736 = AddCommonCatalogDataPlugin1665133966736;
//# sourceMappingURL=1665133966736-AddCommonCatalogDataPlugin.js.map