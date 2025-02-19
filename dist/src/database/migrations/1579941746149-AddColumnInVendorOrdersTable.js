"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorOrdersTable1579941746149 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorOrdersTable1579941746149 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_order_product_tbl_vendor_order_foreignKey',
            columnNames: ['order_product_id'],
            referencedColumnNames: ['order_product_id'],
            referencedTableName: 'order_product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_orders', 'commission');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_orders', new typeorm_1.TableColumn({
                    name: 'commission',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExistt = yield queryRunner.hasColumn('vendor_orders', 'order_product_id');
            if (!ifExistt) {
                yield queryRunner.addColumn('vendor_orders', new typeorm_1.TableColumn({
                    name: 'order_product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const table = yield queryRunner.getTable('vendor_orders');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_orders', 'commission');
            yield queryRunner.dropColumn('vendor_orders', 'order_product_id');
        });
    }
}
exports.AddColumnInVendorOrdersTable1579941746149 = AddColumnInVendorOrdersTable1579941746149;
//# sourceMappingURL=1579941746149-AddColumnInVendorOrdersTable.js.map