"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInSettingTable1597908778448 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInSettingTable1597908778448 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('settings', 'invoice_logo');
            if (!ifExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'invoice_logo',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('settings', 'invoice_logo_path');
            if (!ifExist1) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'invoice_logo_path',
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
            yield queryRunner.dropColumn('settings', 'invoice_logo');
            yield queryRunner.dropColumn('settings', 'invoice_logo_path');
        });
    }
}
exports.AddColumnInSettingTable1597908778448 = AddColumnInSettingTable1597908778448;
//# sourceMappingURL=1597908778448-AddColumnInSettingTable.js.map