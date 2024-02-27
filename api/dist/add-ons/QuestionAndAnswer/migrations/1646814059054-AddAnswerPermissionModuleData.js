"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAnswerPermissionModuleData1646814059054 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
class AddAnswerPermissionModuleData1646814059054 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"product-answer"');
            if (exist.length === 0) {
                const AnswerPermissionGroupSeed = [
                    {
                        // moduleGroupId: 59,
                        name: 'Product Answer',
                        slugName: 'product-answer',
                        sortOrder: '65',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(AnswerPermissionGroupSeed);
                if (val) {
                    const AnswerPermissionSeed = [
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Create Product Answer',
                            slugName: 'create-product-answer',
                            sortOrder: '217',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Update Product Answer',
                            slugName: 'update-product-answer',
                            sortOrder: '218',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Update Answer Status',
                            slugName: 'update-answer-status',
                            sortOrder: '219',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Delete Product Answer',
                            slugName: 'delete-product-answer',
                            sortOrder: '220',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Product Answer List',
                            slugName: 'product-answer-list',
                            sortOrder: '221',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                    ];
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(AnswerPermissionSeed);
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
exports.AddAnswerPermissionModuleData1646814059054 = AddAnswerPermissionModuleData1646814059054;
//# sourceMappingURL=1646814059054-AddAnswerPermissionModuleData.js.map