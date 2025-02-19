"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInRoleAndUser1584098038843 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInRoleAndUser1584098038843 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('user_group', 'permission');
            if (!ifExist) {
                yield queryRunner.addColumn('user_group', new typeorm_1.TableColumn({
                    name: 'permission',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('users', 'permission');
            if (!ifExist1) {
                yield queryRunner.addColumn('users', new typeorm_1.TableColumn({
                    name: 'permission',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('users', 'permission');
            yield queryRunner.dropColumn('user_group', 'permission');
        });
    }
}
exports.AddColumnInRoleAndUser1584098038843 = AddColumnInRoleAndUser1584098038843;
//# sourceMappingURL=1584098038843-AddColumnInRoleAndUser.js.map