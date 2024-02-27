"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelatedProductsPermissionGroupData1654605354974 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AddRelatedProductsPermissionGroupData1654605354974 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"product"');
            const RelatedProductsPermissionSeed = [];
            if (exist.length === 0) {
                const RelatedProductPermissionGroupSeed = [
                    {
                        name: 'Related Product',
                        slugName: 'product',
                        sortOrder: '71',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(RelatedProductPermissionGroupSeed);
                if (val) {
                    RelatedProductsPermissionSeed.push({
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'List Related Products',
                        slugName: 'list-related-product',
                        sortOrder: '247',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Related Products',
                        slugName: 'update-related-product',
                        sortOrder: '248',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Update Related Products',
                        slugName: 'update-related-product',
                        sortOrder: '249',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Related Products Detail',
                        slugName: 'related-product-detail',
                        sortOrder: '250',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    });
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(RelatedProductsPermissionSeed);
                }
            }
            else {
                RelatedProductsPermissionSeed.push({
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'List Related Products',
                    slugName: 'list-related-product',
                    sortOrder: '247',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Add Related Products',
                    slugName: 'update-related-product',
                    sortOrder: '248',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Update Related Products',
                    slugName: 'update-related-product',
                    sortOrder: '249',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Related Products Detail',
                    slugName: 'related-product-detail',
                    sortOrder: '250',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                });
                yield (0, typeorm_1.getRepository)('PermissionModule').save(RelatedProductsPermissionSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddRelatedProductsPermissionGroupData1654605354974 = AddRelatedProductsPermissionGroupData1654605354974;
//# sourceMappingURL=1654605354974-AddRelatedProductsPermissionGroupData.js.map