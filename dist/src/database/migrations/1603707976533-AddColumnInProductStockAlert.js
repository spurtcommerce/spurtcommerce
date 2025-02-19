"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductStockAlert1603707976533 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductStockAlert1603707976533 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product_stock_alert', 'sku_name');
            if (!ifExist) {
                yield queryRunner.addColumn('product_stock_alert', new typeorm_1.TableColumn({
                    name: 'sku_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product_stock_alert', 'sku_name');
        });
    }
}
exports.AddColumnInProductStockAlert1603707976533 = AddColumnInProductStockAlert1603707976533;
//# sourceMappingURL=1603707976533-AddColumnInProductStockAlert.js.map