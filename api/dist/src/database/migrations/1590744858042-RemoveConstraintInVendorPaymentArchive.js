"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveConstraintInVendorPaymentArchive1590744858042 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class RemoveConstraintInVendorPaymentArchive1590744858042 {
    constructor() {
        this.tableForeignKeyyy = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendorPaymentArchive_tbl_vendorOrders_foreignKey',
            columnNames: ['vendor_order_id'],
            referencedColumnNames: ['vednor_order_id'],
            referencedTableName: 'vendor_orders',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_payment_archive');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_order_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_payment_archive');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_order_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
            }
        });
    }
}
exports.RemoveConstraintInVendorPaymentArchive1590744858042 = RemoveConstraintInVendorPaymentArchive1590744858042;
//# sourceMappingURL=1590744858042-RemoveConstraintInVendorPaymentArchive.js.map