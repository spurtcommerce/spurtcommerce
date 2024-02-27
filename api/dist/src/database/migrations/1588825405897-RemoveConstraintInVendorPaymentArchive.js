"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveConstraintInVendorPaymentArchive1588825405897 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class RemoveConstraintInVendorPaymentArchive1588825405897 {
    constructor() {
        this.tableForeignKeyyy = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendorPaymentArchive_tbl_paymentItems_foreignKey',
            columnNames: ['payment_item_id'],
            referencedColumnNames: ['payment_item_id'],
            referencedTableName: 'payment_items',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_payment_archive');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_payment_archive');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
            }
        });
    }
}
exports.RemoveConstraintInVendorPaymentArchive1588825405897 = RemoveConstraintInVendorPaymentArchive1588825405897;
//# sourceMappingURL=1588825405897-RemoveConstraintInVendorPaymentArchive.js.map