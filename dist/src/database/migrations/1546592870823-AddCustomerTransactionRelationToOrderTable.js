"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomerTransactionRelationToOrderTable1546592870823 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCustomerTransactionRelationToOrderTable1546592870823 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_customer_transaction_order1',
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('customer_transaction');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('customer_transaction');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddCustomerTransactionRelationToOrderTable1546592870823 = AddCustomerTransactionRelationToOrderTable1546592870823;
//# sourceMappingURL=1546592870823-AddCustomerTransactionRelationToOrderTable.js.map