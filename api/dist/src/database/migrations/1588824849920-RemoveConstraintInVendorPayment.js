"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveConstraintInVendorPayment1588824849920 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class RemoveConstraintInVendorPayment1588824849920 {
    constructor() {
        this.tableForeignKeyy = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendorPayment_tbl_paymentItems_foreignKey',
            columnNames: ['payment_item_id'],
            referencedColumnNames: ['payment_item_id'],
            referencedTableName: 'payment_items',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_payment');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeyy);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_payment');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeyy);
            }
        });
    }
}
exports.RemoveConstraintInVendorPayment1588824849920 = RemoveConstraintInVendorPayment1588824849920;
//# sourceMappingURL=1588824849920-RemoveConstraintInVendorPayment.js.map