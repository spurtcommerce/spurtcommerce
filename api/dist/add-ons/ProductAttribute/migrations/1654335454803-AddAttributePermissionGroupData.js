"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAttributePermissionGroupData1654335454803 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AddAttributePermissionGroupData1654335454803 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"attribute"');
            const AttributePermissionSeed = [];
            if ((exist.length === 0)) {
                const AttributeGroupPermissionGroupSeed = [
                    {
                        name: 'Attribute Group',
                        slugName: 'attribute',
                        sortOrder: '68',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(AttributeGroupPermissionGroupSeed);
                if (val) {
                    AttributePermissionSeed.push({
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Attribute',
                        slugName: 'add-attribute',
                        sortOrder: '237',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Attribute List',
                        slugName: 'attribute-list',
                        sortOrder: '238',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Attribute',
                        slugName: 'edit-attribute',
                        sortOrder: '239',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Delete Attribute',
                        slugName: 'delete-attribute',
                        sortOrder: '240',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    });
                }
                yield (0, typeorm_1.getRepository)('PermissionModule').save(AttributePermissionSeed);
            }
            else {
                AttributePermissionSeed.push({
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Add Attribute',
                    slugName: 'add-attribute',
                    sortOrder: '237',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Attribute List',
                    slugName: 'attribute-list',
                    sortOrder: '238',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Edit Attribute',
                    slugName: 'edit-attribute',
                    sortOrder: '239',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Delete Attribute',
                    slugName: 'delete-attribute',
                    sortOrder: '240',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                });
                yield (0, typeorm_1.getRepository)('PermissionModule').save(AttributePermissionSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddAttributePermissionGroupData1654335454803 = AddAttributePermissionGroupData1654335454803;
//# sourceMappingURL=1654335454803-AddAttributePermissionGroupData.js.map