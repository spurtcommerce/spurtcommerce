"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomerWishlistRelationToProductTable1552371852472 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCustomerWishlistRelationToProductTable1552371852472 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_wishlist_product',
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
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('customer_wishlist');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddCustomerWishlistRelationToProductTable1552371852472 = AddCustomerWishlistRelationToProductTable1552371852472;
//# sourceMappingURL=1552371852472-AddCustomerWishlistRelationToProductTable.js.map