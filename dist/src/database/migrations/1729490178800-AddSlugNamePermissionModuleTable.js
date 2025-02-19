"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSlugNamePermissionModuleTable1729490178800 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const entities_index_1 = require("../../common/entities-index");
const typeorm_1 = require("typeorm");
class AddSlugNamePermissionModuleTable1729490178800 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistBackOrderList = yield (0, typeorm_1.getRepository)(entities_index_1.PermissionModule).findOne({
                where: { slugName: 'back-order-list' },
            });
            if (!ifExistBackOrderList) {
                yield (0, typeorm_1.getRepository)(entities_index_1.PermissionModule).save({
                    name: 'Back Order List',
                    slugName: 'back-order-list',
                    sortOrder: 357,
                    moduleGroupId: 1,
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                });
            }
            const ifExistFailedOrderList = yield (0, typeorm_1.getRepository)(entities_index_1.PermissionModule).findOne({
                where: { slugName: 'failed-order-list' },
            });
            if (!ifExistFailedOrderList) {
                yield (0, typeorm_1.getRepository)(entities_index_1.PermissionModule).save({
                    name: 'Failed Order List',
                    slugName: 'failed-order-list',
                    sortOrder: 358,
                    moduleGroupId: 1,
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                });
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddSlugNamePermissionModuleTable1729490178800 = AddSlugNamePermissionModuleTable1729490178800;
//# sourceMappingURL=1729490178800-AddSlugNamePermissionModuleTable.js.map