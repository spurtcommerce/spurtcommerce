"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnProductQuestion1734440509387 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnProductQuestion1734440509387 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_product_question_sku',
            columnNames: ['sku_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sku',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('product_question', 'sku_id');
            if (!columnExist) {
                yield queryRunner.query(`DELETE FROM product_question ;`);
                yield queryRunner.addColumn('product_question', new typeorm_1.TableColumn({
                    name: 'sku_id',
                    type: 'integer',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const table = yield queryRunner.getTable('product_question');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product_question', 'sku_id');
        });
    }
}
exports.AddColumnProductQuestion1734440509387 = AddColumnProductQuestion1734440509387;
//# sourceMappingURL=1734440509387-AddColumnProductQuestion.js.map