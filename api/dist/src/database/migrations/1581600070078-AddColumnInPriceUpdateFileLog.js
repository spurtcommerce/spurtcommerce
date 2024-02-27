"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInPriceUpdateFileLog1581600070078 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInPriceUpdateFileLog1581600070078 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_tbl_price_update_file_log_foreignKey',
            columnNames: ['vendor_id'],
            referencedColumnNames: ['vendor_id'],
            referencedTableName: 'vendor',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('price_update_file_log', 'vendor_id');
            if (!ifExist) {
                yield queryRunner.addColumn('price_update_file_log', new typeorm_1.TableColumn({
                    name: 'vendor_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const table = yield queryRunner.getTable('price_update_file_log');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('price_update_file_log', 'vendor_id');
        });
    }
}
exports.AddColumnInPriceUpdateFileLog1581600070078 = AddColumnInPriceUpdateFileLog1581600070078;
//# sourceMappingURL=1581600070078-AddColumnInPriceUpdateFileLog.js.map