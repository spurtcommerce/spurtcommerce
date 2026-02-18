"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInSettingsTable1597042164207 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInSettingsTable1597042164207 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('settings', 'email_logo');
            if (!ifExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'email_logo',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('settings', 'email_logo_path');
            if (!ifExist1) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'email_logo_path',
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
            yield queryRunner.dropColumn('settings', 'email_logo');
            yield queryRunner.dropColumn('settings', 'email_logo_path');
        });
    }
}
exports.AddColumnInSettingsTable1597042164207 = AddColumnInSettingsTable1597042164207;
//# sourceMappingURL=1597042164207-AddColumnInSettingsTable.js.map