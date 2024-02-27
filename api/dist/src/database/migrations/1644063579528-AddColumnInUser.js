"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInUser1644063579528 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInUser1644063579528 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('users', 'forget_password_link_expires');
            if (!ifExist) {
                yield queryRunner.addColumn('users', new typeorm_1.TableColumn({
                    name: 'forget_password_link_expires',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('users', 'forget_password_key');
            if (!ifExist1) {
                yield queryRunner.addColumn('users', new typeorm_1.TableColumn({
                    name: 'forget_password_key',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('users', 'forget_password_link_expires');
            yield queryRunner.dropColumn('users', 'forget_password_key');
        });
    }
}
exports.AddColumnInUser1644063579528 = AddColumnInUser1644063579528;
//# sourceMappingURL=1644063579528-AddColumnInUser.js.map