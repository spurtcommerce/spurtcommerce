"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddContraintForRelatedProduct1591679473816 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddContraintForRelatedProduct1591679473816 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_product_related_tbl_product_foreignKey',
            columnNames: ['related_product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_related');
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('related_product_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_related');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('related_product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
}
exports.AddContraintForRelatedProduct1591679473816 = AddContraintForRelatedProduct1591679473816;
//# sourceMappingURL=1591679473816-AddContraintForRelatedProduct.js.map