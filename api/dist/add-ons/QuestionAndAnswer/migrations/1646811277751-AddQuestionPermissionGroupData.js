"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQuestionPermissionGroupData1646811277751 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
class AddQuestionPermissionGroupData1646811277751 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"product-question"');
            if ((exist.length === 0)) {
                const QuestionPermissionGroupSeed = [
                    {
                        // moduleGroupId: 58,
                        name: 'Product Question',
                        slugName: 'product-question',
                        sortOrder: '64',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(QuestionPermissionGroupSeed);
                if (val) {
                    const QuestionPermissionSeed = [
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Create Product Question',
                            slugName: 'create-product-question',
                            sortOrder: '212',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Update Product Question',
                            slugName: 'update-product-question',
                            sortOrder: '213',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Product Question List',
                            slugName: 'product-question-list',
                            sortOrder: '214',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Delete Product Question',
                            slugName: 'delete-product-question',
                            sortOrder: '215',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Update Question Status',
                            slugName: 'update-question-status',
                            sortOrder: '216',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                    ];
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(QuestionPermissionSeed);
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
exports.AddQuestionPermissionGroupData1646811277751 = AddQuestionPermissionGroupData1646811277751;
//# sourceMappingURL=1646811277751-AddQuestionPermissionGroupData.js.map