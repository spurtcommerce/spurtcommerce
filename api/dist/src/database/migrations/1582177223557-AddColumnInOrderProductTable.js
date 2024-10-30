"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderProductTable1582177223557 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderProductTable1582177223557 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_order_status_tbl_order_product_foreignKey',
            columnNames: ['order_status_id'],
            referencedColumnNames: ['order_status_id'],
            referencedTableName: 'order_status',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order_product', 'order_status_id');
            if (!ifExist) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'order_status_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExistt = yield queryRunner.hasColumn('order_product', 'tracking_url');
            if (!ifExistt) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'tracking_url',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExisttt = yield queryRunner.hasColumn('order_product', 'tracking_no');
            if (!ifExisttt) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'tracking_no',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const table = yield queryRunner.getTable('order_product');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_status_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order_product', 'order_status_id');
            yield queryRunner.dropColumn('order_product', 'tracking_url');
            yield queryRunner.dropColumn('order_product', 'tracking_no');
        });
    }
}
exports.AddColumnInOrderProductTable1582177223557 = AddColumnInOrderProductTable1582177223557;
//# sourceMappingURL=1582177223557-AddColumnInOrderProductTable.js.map