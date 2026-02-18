"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterProductIdtoSkuPriceGroup1716011979609 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterProductIdtoSkuPriceGroup1716011979609 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_price_group_detail_sku_sku_id',
            columnNames: ['sku_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sku',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('vendor_price_group_detail', 'fk_vendor_price_group_detail_product_product_id_idx');
            yield queryRunner.changeColumn('vendor_price_group_detail', new typeorm_1.TableColumn({
                name: 'product_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }), new typeorm_1.TableColumn({
                name: 'sku_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: false,
            }));
            const getTable = yield queryRunner.getTable('vendor_price_group_detail');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterProductIdtoSkuPriceGroup1716011979609 = AlterProductIdtoSkuPriceGroup1716011979609;
//# sourceMappingURL=1716011979609-AlterProductIdtoSkuPriceGroup.js.map