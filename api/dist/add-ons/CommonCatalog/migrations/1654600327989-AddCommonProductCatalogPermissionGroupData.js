"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommonProductCatalogPermissionGroupData1654600327989 = void 0;
const tslib_1 = require("tslib");
const moment = require("moment/moment");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddCommonProductCatalogPermissionGroupData1654600327989 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"market-place-product"');
            const CommonProductCatalogSeed = [];
            if ((exist.length === 0)) {
                const CommonProductCatalogPermissionGroupSeed = [
                    {
                        name: 'Common Product Catalog',
                        slugName: 'market-place-product',
                        sortOrder: '35',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeormLoader_1.getDataSource)().getRepository('PermissionModuleGroup').save(CommonProductCatalogPermissionGroupSeed);
                if (val) {
                    CommonProductCatalogSeed.push({
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Common Catalog Product List ',
                        slugName: 'common-catalog-product-list',
                        sortOrder: '259',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Set Common Product',
                        slugName: 'set-common-product',
                        sortOrder: '260',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Set Common Products',
                        slugName: 'set-common-products',
                        sortOrder: '261',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Common Product Detail',
                        slugName: 'common-product-detail',
                        sortOrder: '262',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Common Product Status',
                        slugName: 'update-common-product-status',
                        sortOrder: '263',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    });
                }
                yield (0, typeormLoader_1.getDataSource)().getRepository('PermissionModule').save(CommonProductCatalogSeed);
            }
            else {
                CommonProductCatalogSeed.push({
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Common Catalog Product List ',
                    slugName: 'common-catalog-product-list',
                    sortOrder: '259',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Set Common Product',
                    slugName: 'set-common-product',
                    sortOrder: '260',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Set Common Products',
                    slugName: 'set-common-products',
                    sortOrder: '261',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Common Product Detail',
                    slugName: 'common-product-detail',
                    sortOrder: '262',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Edit Common Product Status',
                    slugName: 'update-common-product-status',
                    sortOrder: '263',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                });
                yield (0, typeormLoader_1.getDataSource)().getRepository('PermissionModule').save(CommonProductCatalogSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddCommonProductCatalogPermissionGroupData1654600327989 = AddCommonProductCatalogPermissionGroupData1654600327989;
//# sourceMappingURL=1654600327989-AddCommonProductCatalogPermissionGroupData.js.map