"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInSkuTable1603690775002 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInSkuTable1603690775002 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist1 = yield queryRunner.hasColumn('sku', 'out_of_stock_threshold');
            if (!ifExist1) {
                yield queryRunner.addColumn('sku', new typeorm_1.TableColumn({
                    name: 'out_of_stock_threshold',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('sku', 'notify_min_quantity_below');
            if (!ifExist2) {
                yield queryRunner.addColumn('sku', new typeorm_1.TableColumn({
                    name: 'notify_min_quantity_below',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist3 = yield queryRunner.hasColumn('sku', 'min_quantity_allowed_cart');
            if (!ifExist3) {
                yield queryRunner.addColumn('sku', new typeorm_1.TableColumn({
                    name: 'min_quantity_allowed_cart',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist4 = yield queryRunner.hasColumn('sku', 'max_quantity_allowed_cart');
            if (!ifExist4) {
                yield queryRunner.addColumn('sku', new typeorm_1.TableColumn({
                    name: 'max_quantity_allowed_cart',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist5 = yield queryRunner.hasColumn('sku', 'enable_back_orders');
            if (!ifExist5) {
                yield queryRunner.addColumn('sku', new typeorm_1.TableColumn({
                    name: 'enable_back_orders',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('sku', 'out_of_stock_threshold');
            yield queryRunner.dropColumn('sku', 'notify_min_quantity_below');
            yield queryRunner.dropColumn('sku', 'max_quantity_allowed_cart');
            yield queryRunner.dropColumn('sku', 'min_quantity_allowed_cart');
            yield queryRunner.dropColumn('sku', 'enable_back_orders');
        });
    }
}
exports.AddColumnInSkuTable1603690775002 = AddColumnInSkuTable1603690775002;
//# sourceMappingURL=1603690775002-AddColumnInSkuTable.js.map