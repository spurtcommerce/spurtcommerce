"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWidgetPermission1647402175581 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
class AddWidgetPermission1647402175581 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"wigdets"');
            if (exist.length === 0) {
                const WidgetPermissionGroupSeed = [
                    {
                        name: 'Widgets',
                        slugName: 'widgets',
                        sortOrder: '63',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(WidgetPermissionGroupSeed);
                if (val) {
                    const WidgetPermissionSeed = [
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Add Widget',
                            slugName: 'add-widget',
                            sortOrder: '208',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Edit Widget',
                            slugName: 'edit-widget',
                            sortOrder: '209',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Widget list',
                            slugName: 'widget-list',
                            sortOrder: '300',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Widget Delete',
                            slugName: 'widget-delete',
                            sortOrder: '301',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                    ];
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(WidgetPermissionSeed);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddWidgetPermission1647402175581 = AddWidgetPermission1647402175581;
//# sourceMappingURL=1647402175581-AddWidgetPermission.js.map