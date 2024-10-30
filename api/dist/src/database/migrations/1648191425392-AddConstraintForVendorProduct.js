"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintForVendorProduct1648191425392 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddConstraintForVendorProduct1648191425392 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_product_tbl_sku_foreignKey',
            columnNames: ['sku_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sku',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_product');
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor_product');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
}
exports.AddConstraintForVendorProduct1648191425392 = AddConstraintForVendorProduct1648191425392;
//# sourceMappingURL=1648191425392-AddConstraintForVendorProduct.js.map