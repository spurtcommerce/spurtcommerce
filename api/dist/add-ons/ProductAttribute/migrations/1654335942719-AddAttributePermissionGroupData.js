"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAttributePermissionGroupData1654335942719 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AddAttributePermissionGroupData1654335942719 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"attribute"');
            const AttributeGroupPermissionSeed = [];
            if ((exist.length === 0)) {
                const AttributePermissionGroupSeed = [
                    {
                        name: 'Attribute Group',
                        slugName: 'attribute',
                        sortOrder: '68',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(AttributePermissionGroupSeed);
                if (val) {
                    AttributeGroupPermissionSeed.push({
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Attribute Group',
                        slugName: 'attribute-group-add',
                        sortOrder: '241',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Attribute List',
                        slugName: 'attribute-list',
                        sortOrder: '242',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Delete Attribute Group',
                        slugName: 'attribute-group-delete',
                        sortOrder: '243',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    });
                }
                yield (0, typeorm_1.getRepository)('PermissionModule').save(AttributeGroupPermissionSeed);
            }
            else {
                AttributeGroupPermissionSeed.push({
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Add Attribute Group',
                    slugName: 'attribute-group-add',
                    sortOrder: '241',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Attribute List',
                    slugName: 'attribute-list',
                    sortOrder: '242',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Delete Attribute Group',
                    slugName: 'attribute-group-delete',
                    sortOrder: '243',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                });
                yield (0, typeorm_1.getRepository)('PermissionModule').save(AttributeGroupPermissionSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddAttributePermissionGroupData1654335942719 = AddAttributePermissionGroupData1654335942719;
//# sourceMappingURL=1654335942719-AddAttributePermissionGroupData.js.map