"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDataIslistPermissionModule1724654771491 = void 0;
const tslib_1 = require("tslib");
class UpdateDataIslistPermissionModule1724654771491 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnCheck = yield queryRunner.hasColumn('permission_module', 'is_listed');
            if (columnCheck) {
                yield queryRunner.query(`UPDATE permission_module SET is_listed = ${1} WHERE  name LIKE '%List%'`);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateDataIslistPermissionModule1724654771491 = UpdateDataIslistPermissionModule1724654771491;
//# sourceMappingURL=1724654771491-UpdateDataIslistPermissionModule.js.map