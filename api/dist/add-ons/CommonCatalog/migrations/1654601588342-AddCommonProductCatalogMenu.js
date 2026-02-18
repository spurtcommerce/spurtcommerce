"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommonProductCatalogMenu1654601588342 = void 0;
const tslib_1 = require("tslib");
const moment = require("moment/moment");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddCommonProductCatalogMenu1654601588342 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const CommonCatalogProductSeed = [
                {
                    menuName: 'Common Product Catalog',
                    menuModule: 'Marketplace Manage Products',
                    path: '#/vendors/manage-products/common_catalog',
                    icon: '',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeormLoader_1.getDataSource)().getRepository('PluginMenu').save(CommonCatalogProductSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddCommonProductCatalogMenu1654601588342 = AddCommonProductCatalogMenu1654601588342;
//# sourceMappingURL=1654601588342-AddCommonProductCatalogMenu.js.map