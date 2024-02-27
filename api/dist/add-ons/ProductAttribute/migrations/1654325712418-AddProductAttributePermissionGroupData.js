"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductAttributePermissionGroupData1654325712418 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AddProductAttributePermissionGroupData1654325712418 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"product"');
            if ((exist.length !== 0)) {
                const ProductAttributeSeed = [
                    {
                        moduleGroupId: exist[0].moduleGroupId,
                        name: 'Product Attribute List',
                        slugName: 'product-attribute-list',
                        sortOrder: '235',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: exist[0].moduleGroupId,
                        name: 'Add Product Attribute',
                        slugName: 'update-product-attribute',
                        sortOrder: '236',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                yield (0, typeorm_1.getRepository)('PermissionModule').save(ProductAttributeSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddProductAttributePermissionGroupData1654325712418 = AddProductAttributePermissionGroupData1654325712418;
//# sourceMappingURL=1654325712418-AddProductAttributePermissionGroupData.js.map