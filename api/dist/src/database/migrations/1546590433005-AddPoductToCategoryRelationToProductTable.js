"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPoductToCategoryRelationToProductTable1546590433005 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddPoductToCategoryRelationToProductTable1546590433005 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_product_to_category_product1',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_to_category');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_to_category');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddPoductToCategoryRelationToProductTable1546590433005 = AddPoductToCategoryRelationToProductTable1546590433005;
//# sourceMappingURL=1546590433005-AddPoductToCategoryRelationToProductTable.js.map