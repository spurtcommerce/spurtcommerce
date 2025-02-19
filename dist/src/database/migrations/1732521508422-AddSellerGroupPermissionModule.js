"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSellerGroupPermissionModule1732521508422 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const PermissionModuleGroup_1 = require("../../api/core/models/PermissionModuleGroup");
const typeorm_1 = require("typeorm");
class AddSellerGroupPermissionModule1732521508422 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').findOne({ where: { slugName: 'market-place-vendor' } });
            if (exist) {
                exist.slugName = 'seller';
                exist.name = 'Seller';
                yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(exist);
            }
            const val2 = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').findOne({ where: { slugName: 'seller-group' } });
            if (!val2) {
                const sellerGroupPermissionModule = new PermissionModuleGroup_1.PermissionModuleGroup();
                sellerGroupPermissionModule.name = 'Seller Group';
                sellerGroupPermissionModule.slugName = 'seller-group';
                sellerGroupPermissionModule.sortOrder = 20;
                sellerGroupPermissionModule.createdDate = `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`;
                sellerGroupPermissionModule.modifiedDate = `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`;
                const val3 = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(sellerGroupPermissionModule);
                const SellerGroupPermissionSeed = [
                    {
                        moduleGroupId: val3.moduleGroupId,
                        name: 'Create Seller Group',
                        slugName: 'create-seller-group',
                        sortOrder: '315',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val3.moduleGroupId,
                        name: 'Update Seller Group',
                        slugName: 'update-seller-group',
                        sortOrder: '316',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val3.moduleGroupId,
                        name: 'List Seller Group',
                        slugName: 'list-seller-group',
                        sortOrder: '317',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val3.moduleGroupId,
                        name: 'Delete Seller Group',
                        slugName: 'delete-seller-group',
                        sortOrder: '318',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                yield (0, typeorm_1.getRepository)('PermissionModule').save(SellerGroupPermissionSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddSellerGroupPermissionModule1732521508422 = AddSellerGroupPermissionModule1732521508422;
//# sourceMappingURL=1732521508422-AddSellerGroupPermissionModule.js.map