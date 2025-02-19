"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnPermissionModule1724649879628 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnPermissionModule1724649879628 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnCheck = yield queryRunner.hasColumn('permission_module', 'is_listed');
            if (!columnCheck) {
                yield queryRunner.addColumn('permission_module', new typeorm_1.TableColumn({
                    name: 'is_listed',
                    type: 'Boolean',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnPermissionModule1724649879628 = AddColumnPermissionModule1724649879628;
//# sourceMappingURL=1724649879628-AddColumnPermissionModule.js.map