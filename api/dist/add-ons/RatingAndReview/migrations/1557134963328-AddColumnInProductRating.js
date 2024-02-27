"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductRating1557134963328 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductRating1557134963328 {
    constructor() {
        this.foreignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_order_product_product_rating',
            columnNames: ['order_product_id'],
            referencedColumnNames: ['order_product_id'],
            referencedTableName: 'order_product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product_rating', 'order_product_id');
            if (!ifExist) {
                yield queryRunner.addColumn('product_rating', new typeorm_1.TableColumn({
                    name: 'order_product_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
                const table = yield queryRunner.getTable('product_rating');
                const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
                if (!ifDataExsist) {
                    yield queryRunner.createForeignKey(table, this.foreignKey);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_rating');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.foreignKey);
            }
        });
    }
}
exports.AddColumnInProductRating1557134963328 = AddColumnInProductRating1557134963328;
//# sourceMappingURL=1557134963328-AddColumnInProductRating.js.map