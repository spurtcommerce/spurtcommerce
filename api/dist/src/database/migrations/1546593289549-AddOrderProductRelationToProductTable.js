"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrderProductRelationToProductTable1546593289549 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddOrderProductRelationToProductTable1546593289549 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_order_product_product1',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order_product');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order_product');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddOrderProductRelationToProductTable1546593289549 = AddOrderProductRelationToProductTable1546593289549;
//# sourceMappingURL=1546593289549-AddOrderProductRelationToProductTable.js.map