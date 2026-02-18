"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveDocumentPermissionModule1732687359333 = void 0;
const tslib_1 = require("tslib");
class RemoveDocumentPermissionModule1732687359333 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM permission_module WHERE module_id IN (176, 177, 178);`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.RemoveDocumentPermissionModule1732687359333 = RemoveDocumentPermissionModule1732687359333;
//# sourceMappingURL=1732687359333-RemoveDocumentPermissionModule.js.map