"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInProductPriceLog1582888041707 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterColumnInProductPriceLog1582888041707 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product_price_log', 'price_update_file_log_id');
            if (!ifExist) {
                yield queryRunner.addColumn('product_price_log', new typeorm_1.TableColumn({
                    name: 'price_update_file_log_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('product_price_log', true);
        });
    }
}
exports.AlterColumnInProductPriceLog1582888041707 = AlterColumnInProductPriceLog1582888041707;
//# sourceMappingURL=1582888041707-AlterColumnInProductPriceLog.js.map