"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVariantPermissionGroupData1654580494430 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AddVariantPermissionGroupData1654580494430 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"variants"');
            const VariantsGroupPermissionSeed = [];
            if ((exist.length === 0)) {
                const VariantsPermissionGroupSeed = [
                    {
                        name: 'Variant',
                        slugName: 'variants',
                        sortOrder: '69',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(VariantsPermissionGroupSeed);
                if (val) {
                    VariantsGroupPermissionSeed.push({
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Variants',
                        slugName: 'variant-add',
                        sortOrder: '244',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Variant',
                        slugName: 'variant-edit',
                        sortOrder: '245',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Delete Variant',
                        slugName: 'varient-delete',
                        sortOrder: '246',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Variant Detail',
                        slugName: 'variant-detail',
                        sortOrder: '247',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    });
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(VariantsGroupPermissionSeed);
                }
            }
            else {
                VariantsGroupPermissionSeed.push({
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Add Variants',
                    slugName: 'variant-add',
                    sortOrder: '244',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Edit Variant',
                    slugName: 'variant-edit',
                    sortOrder: '245',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Delete Variant',
                    slugName: 'varient-delete',
                    sortOrder: '246',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Variant Detail',
                    slugName: 'variant-detail',
                    sortOrder: '247',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                });
                yield (0, typeorm_1.getRepository)('PermissionModule').save(VariantsGroupPermissionSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddVariantPermissionGroupData1654580494430 = AddVariantPermissionGroupData1654580494430;
//# sourceMappingURL=1654580494430-AddVariantPermissionGroupData.js.map