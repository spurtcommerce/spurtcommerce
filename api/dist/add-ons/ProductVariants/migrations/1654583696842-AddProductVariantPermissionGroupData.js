"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductVariantPermissionGroupData1654583696842 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AddProductVariantPermissionGroupData1654583696842 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"product"');
            const ProductVariantsGroupPermissionSeed = [];
            if ((exist.length === 0)) {
                const ProductVariantsPermissionGroupSeed = [
                    {
                        name: 'Product Variant',
                        slugName: 'product',
                        sortOrder: '70',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(ProductVariantsPermissionGroupSeed);
                if (val) {
                    ProductVariantsGroupPermissionSeed.push({
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Product Variant List',
                        slugName: 'variant-product-list',
                        sortOrder: '251',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Product Variant',
                        slugName: 'product-variant-update',
                        sortOrder: '252',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Product Variant',
                        slugName: 'product-variant-update',
                        sortOrder: '253',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Product Variants Product Detail',
                        slugName: 'product-variant-detail',
                        sortOrder: '254',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Product Variant Inventory List',
                        slugName: 'product-variant-inventory-list',
                        sortOrder: '255',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Update Stock',
                        slugName: 'stock-update',
                        sortOrder: '256',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Delete Product Variant',
                        slugName: 'delete-product-variant',
                        sortOrder: '257',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Inventory Product List',
                        slugName: 'inventory-product-list',
                        sortOrder: '258',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    });
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(ProductVariantsGroupPermissionSeed);
                }
            }
            else {
                ProductVariantsGroupPermissionSeed.push({
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Product Variant List',
                    slugName: 'variant-product-list',
                    sortOrder: '251',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Edit Product Variant',
                    slugName: 'product-variant-update',
                    sortOrder: '252',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Add Product Variant',
                    slugName: 'product-variant-update',
                    sortOrder: '253',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Product Variants Product Detail',
                    slugName: 'product-variant-detail',
                    sortOrder: '254',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Product Variant Inventory List',
                    slugName: 'product-variant-inventory-list',
                    sortOrder: '255',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Update Stock',
                    slugName: 'stock-update',
                    sortOrder: '256',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Delete Product Variant',
                    slugName: 'delete-product-variant',
                    sortOrder: '257',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Inventory Product List',
                    slugName: 'inventory-product-list',
                    sortOrder: '258',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                });
                yield (0, typeorm_1.getRepository)('PermissionModule').save(ProductVariantsGroupPermissionSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddProductVariantPermissionGroupData1654583696842 = AddProductVariantPermissionGroupData1654583696842;
//# sourceMappingURL=1654583696842-AddProductVariantPermissionGroupData.js.map