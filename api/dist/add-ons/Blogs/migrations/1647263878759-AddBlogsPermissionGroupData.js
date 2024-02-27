"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBlogsPermissionGroupData1647263878759 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AddBlogsPermissionGroupData1647263878759 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"blogs"');
            if ((exist.length === 0)) {
                const BlogsPermissionGroupSeed = [
                    {
                        name: 'Blogs',
                        slugName: 'blogs',
                        sortOrder: '35',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(BlogsPermissionGroupSeed);
                if (val) {
                    const BlogsPermissionSeed = [
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'List Blogs',
                            slugName: 'list-blogs',
                            sortOrder: '133',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Create Blogs',
                            slugName: 'create-blogs',
                            sortOrder: '134',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Edit Blogs',
                            slugName: 'edit-blogs',
                            sortOrder: '135',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Delete Blogs',
                            slugName: 'delete-blogs',
                            sortOrder: '136',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                    ];
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(BlogsPermissionSeed);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddBlogsPermissionGroupData1647263878759 = AddBlogsPermissionGroupData1647263878759;
//# sourceMappingURL=1647263878759-AddBlogsPermissionGroupData.js.map