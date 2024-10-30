"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnStockLog1603708000934 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnStockLog1603708000934 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('stock_log', 'sku_name');
            if (!ifExist) {
                yield queryRunner.addColumn('stock_log', new typeorm_1.TableColumn({
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
            yield queryRunner.dropColumn('stock_log', 'sku_name');
        });
    }
}
exports.AddColumnStockLog1603708000934 = AddColumnStockLog1603708000934;
//# sourceMappingURL=1603708000934-AddColumnStockLog.js.map