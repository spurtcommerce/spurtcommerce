"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductRatingRelationToProductTable1546585460413 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddProductRatingRelationToProductTable1546585460413 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_product_rating_product1',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_rating');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_rating');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddProductRatingRelationToProductTable1546585460413 = AddProductRatingRelationToProductTable1546585460413;
//# sourceMappingURL=1546585460413-AddProductRatingRelationToProductTable.js.map