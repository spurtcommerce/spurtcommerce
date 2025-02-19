"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationWishlistToProductTable1561786420039 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationWishlistToProductTable1561786420039 {
    constructor() {
        this.wishlistToProductForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_customer_wishlist_tbl_product',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('customer_wishlist');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.wishlistToProductForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('customer_wishlist');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.wishlistToProductForeignKeys);
            }
        });
    }
}
exports.AddRelationWishlistToProductTable1561786420039 = AddRelationWishlistToProductTable1561786420039;
//# sourceMappingURL=1561786420039-AddRelationWishlistToProductTable.js.map