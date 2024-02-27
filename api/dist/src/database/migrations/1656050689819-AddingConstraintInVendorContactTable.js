"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingConstraintInVendorContactTable1656050689819 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddingConstraintInVendorContactTable1656050689819 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_contact_tbl_vendor',
            columnNames: ['vendor_id'],
            referencedColumnNames: ['vendor_id'],
            referencedTableName: 'vendor',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_contact');
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_contact');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
}
exports.AddingConstraintInVendorContactTable1656050689819 = AddingConstraintInVendorContactTable1656050689819;
//# sourceMappingURL=1656050689819-AddingConstraintInVendorContactTable.js.map