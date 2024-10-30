"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductPriceLog1574752546404 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductPriceLog1574752546404 {
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
            const ifExists = yield queryRunner.hasColumn('product', 'price_update_file_log_id');
            if (!ifExists) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
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
            yield queryRunner.dropColumn('product_price_log', 'price_update_file_log_id');
            yield queryRunner.dropColumn('product', 'price_update_file_log_id');
        });
    }
}
exports.AddColumnInProductPriceLog1574752546404 = AddColumnInProductPriceLog1574752546404;
//# sourceMappingURL=1574752546404-AddColumnInProductPriceLog.js.map