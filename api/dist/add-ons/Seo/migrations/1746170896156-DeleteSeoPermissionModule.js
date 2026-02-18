"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSeoPermissionModule1746170896156 = void 0;
const tslib_1 = require("tslib");
class DeleteSeoPermissionModule1746170896156 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const permissionGroup = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = "seo"');
            const moduleGroupId = permissionGroup[0].module_group_id;
            yield queryRunner.query('DELETE FROM `permission_module` WHERE `module_group_id` = ?', [moduleGroupId]);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.DeleteSeoPermissionModule1746170896156 = DeleteSeoPermissionModule1746170896156;
//# sourceMappingURL=1746170896156-DeleteSeoPermissionModule.js.map