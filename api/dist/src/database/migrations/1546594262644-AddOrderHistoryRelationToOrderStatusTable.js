"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrderHistoryRelationToOrderStatusTable1546594262644 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddOrderHistoryRelationToOrderStatusTable1546594262644 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_order_history_order_status1',
            columnNames: ['order_status_id'],
            referencedColumnNames: ['order_status_id'],
            referencedTableName: 'order_status',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order_history');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_status_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order_history');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_status_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddOrderHistoryRelationToOrderStatusTable1546594262644 = AddOrderHistoryRelationToOrderStatusTable1546594262644;
//# sourceMappingURL=1546594262644-AddOrderHistoryRelationToOrderStatusTable.js.map