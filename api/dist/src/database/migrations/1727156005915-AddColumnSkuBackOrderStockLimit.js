"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnSkuBackOrderStockLimit1727156005915 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnSkuBackOrderStockLimit1727156005915 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('sku', 'back_order_stock_limit');
            if (!columnExist) {
                yield queryRunner.addColumn('sku', new typeorm_1.TableColumn({
                    name: 'back_order_stock_limit',
                    type: 'int',
                    isNullable: true,
                    default: 0,
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
exports.AddColumnSkuBackOrderStockLimit1727156005915 = AddColumnSkuBackOrderStockLimit1727156005915;
//# sourceMappingURL=1727156005915-AddColumnSkuBackOrderStockLimit.js.map