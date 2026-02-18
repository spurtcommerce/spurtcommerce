"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductSkuIdInProductRatingTable1734335106062 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddProductSkuIdInProductRatingTable1734335106062 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('product_rating', 'sku_id');
            if (!columnExist) {
                yield queryRunner.query(`DELETE FROM product_rating ;`);
                yield queryRunner.addColumn('product_rating', new typeorm_1.TableColumn({
                    name: 'sku_id',
                    type: 'int',
                    isNullable: false,
                    isPrimary: false,
                }));
                yield queryRunner.createForeignKey('product_rating', new typeorm_1.TableForeignKey({
                    columnNames: ['sku_id'],
                    referencedTableName: 'sku',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddProductSkuIdInProductRatingTable1734335106062 = AddProductSkuIdInProductRatingTable1734335106062;
//# sourceMappingURL=1734335106062-AddProductSkuIdInProductRatingTable.js.map