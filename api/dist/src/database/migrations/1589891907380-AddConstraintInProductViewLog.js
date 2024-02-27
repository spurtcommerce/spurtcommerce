"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintInProductViewLog1589891907380 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddConstraintInProductViewLog1589891907380 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_product_view_log_tbl_product_foreignKey',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_view_log');
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_view_log');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
}
exports.AddConstraintInProductViewLog1589891907380 = AddConstraintInProductViewLog1589891907380;
//# sourceMappingURL=1589891907380-AddConstraintInProductViewLog.js.map