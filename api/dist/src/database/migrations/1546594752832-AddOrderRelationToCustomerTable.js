"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrderRelationToCustomerTable1546594752832 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddOrderRelationToCustomerTable1546594752832 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_order_customer1',
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
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddOrderRelationToCustomerTable1546594752832 = AddOrderRelationToCustomerTable1546594752832;
//# sourceMappingURL=1546594752832-AddOrderRelationToCustomerTable.js.map