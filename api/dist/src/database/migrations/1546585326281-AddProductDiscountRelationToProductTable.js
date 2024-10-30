"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductDiscountRelationToProductTable1546585326281 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddProductDiscountRelationToProductTable1546585326281 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_product_discount_product1',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_discount');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_discount');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddProductDiscountRelationToProductTable1546585326281 = AddProductDiscountRelationToProductTable1546585326281;
//# sourceMappingURL=1546585326281-AddProductDiscountRelationToProductTable.js.map