"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdddefaultLanguageInsettingTable1711168757035 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AdddefaultLanguageInsettingTable1711168757035 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableForeignKey = new typeorm_1.TableForeignKey({
                name: 'fk_tbl_settings_lanaguge_language_id',
                columnNames: ['default_language_id'],
                referencedColumnNames: ['language_id'],
                referencedTableName: 'language',
                onDelete: 'RESTRICT',
            });
            const columnExist = yield queryRunner.hasColumn('settings', 'default_language_id');
            if (!columnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'default_language_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const getTable = yield queryRunner.getTable('settings');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('default_language_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AdddefaultLanguageInsettingTable1711168757035 = AdddefaultLanguageInsettingTable1711168757035;
//# sourceMappingURL=1711168757035-AdddefaultLanguageInsettingTable.js.map