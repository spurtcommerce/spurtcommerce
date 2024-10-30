"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInLoginAttempts1621056856672 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInLoginAttempts1621056856672 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist1 = yield queryRunner.hasColumn('login_attempts', 'created_by');
            if (!ifExist1) {
                yield queryRunner.addColumn('login_attempts', new typeorm_1.TableColumn({
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('login_attempts', 'created_date');
            if (!ifExist2) {
                yield queryRunner.addColumn('login_attempts', new typeorm_1.TableColumn({
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }));
            }
            const ifExist3 = yield queryRunner.hasColumn('login_attempts', 'modified_by');
            if (!ifExist3) {
                yield queryRunner.addColumn('login_attempts', new typeorm_1.TableColumn({
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist4 = yield queryRunner.hasColumn('login_attempts', 'modified_date');
            if (!ifExist4) {
                yield queryRunner.addColumn('login_attempts', new typeorm_1.TableColumn({
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('login_attempts', 'created_by');
            yield queryRunner.dropColumn('login_attempts', 'created_date');
            yield queryRunner.dropColumn('login_attempts', 'modified_by');
            yield queryRunner.dropColumn('login_attempts', 'modified_date');
        });
    }
}
exports.AddColumnInLoginAttempts1621056856672 = AddColumnInLoginAttempts1621056856672;
//# sourceMappingURL=1621056856672-AddColumnInLoginAttempts.js.map