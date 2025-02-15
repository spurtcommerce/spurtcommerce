"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintInVendorCategoryGroupTable1653559095446 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddConstraintInVendorCategoryGroupTable1653559095446 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_group_category_tbl_vendor_group',
            columnNames: ['vendor_group_id'],
            referencedColumnNames: ['group_id'],
            referencedTableName: 'vendor_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_group_category');
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_group_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_group_category');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_group_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
}
exports.AddConstraintInVendorCategoryGroupTable1653559095446 = AddConstraintInVendorCategoryGroupTable1653559095446;
//# sourceMappingURL=1653559095446-AddConstraintInVendorCategoryGroupTable.js.map