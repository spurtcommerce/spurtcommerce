"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnForSkuIdInProduct1601872052590 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnForSkuIdInProduct1601872052590 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_sku_tbl_product_foreignKey',
            columnNames: ['sku_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sku',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'sku_id');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'sku_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const table = yield queryRunner.getTable('product');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product', 'sku_id');
        });
    }
}
exports.AddColumnForSkuIdInProduct1601872052590 = AddColumnForSkuIdInProduct1601872052590;
//# sourceMappingURL=1601872052590-AddColumnForSkuIdInProduct.js.map