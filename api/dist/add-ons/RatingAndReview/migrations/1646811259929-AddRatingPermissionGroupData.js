"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRatingPermissionGroupData1646811259929 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
class AddRatingPermissionGroupData1646811259929 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"rating-review"');
            if (exist.length === 0) {
                const RatingAndReviewPermissionGroupSeed = [
                    {
                        // moduleGroupId: 5,
                        name: 'Rating Review',
                        slugName: 'rating-review',
                        sortOrder: '5',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(RatingAndReviewPermissionGroupSeed);
                if (val) {
                    const RatingAndReviewPermissionSeed = [
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'Edit Rating Review',
                            slugName: 'edit-rating-review',
                            sortOrder: '18',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                        {
                            moduleGroupId: val[0].moduleGroupId,
                            name: 'List Rating Review',
                            slugName: 'list-rating-review',
                            sortOrder: '110',
                            createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                            updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        },
                    ];
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(RatingAndReviewPermissionSeed);
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
exports.AddRatingPermissionGroupData1646811259929 = AddRatingPermissionGroupData1646811259929;
//# sourceMappingURL=1646811259929-AddRatingPermissionGroupData.js.map