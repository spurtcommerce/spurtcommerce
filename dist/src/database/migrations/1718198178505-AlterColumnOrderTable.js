"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnOrderTable1718198178505 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterColumnOrderTable1718198178505 {
    constructor() {
        this.tableForeignKeyyy = new typeorm_1.TableForeignKey({
            name: 'fk_order_customer_customer_id',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnOrderTable1718198178505 = AlterColumnOrderTable1718198178505;
//# sourceMappingURL=1718198178505-AlterColumnOrderTable.js.map