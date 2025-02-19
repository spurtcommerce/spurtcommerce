"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductTable1589003393774 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductTable1589003393774 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'has_stock');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'has_stock',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('product', 'has_tire_price');
            if (!ifExist1) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'has_tire_price',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('product', 'out_of_stock_threshold');
            if (!ifExist2) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'out_of_stock_threshold',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist3 = yield queryRunner.hasColumn('product', 'notify_min_quantity_below');
            if (!ifExist3) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'notify_min_quantity_below',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist4 = yield queryRunner.hasColumn('product', 'min_quantity_allowed_cart');
            if (!ifExist4) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'min_quantity_allowed_cart',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist5 = yield queryRunner.hasColumn('product', 'max_quantity_allowed_cart');
            if (!ifExist5) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'max_quantity_allowed_cart',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist6 = yield queryRunner.hasColumn('product', 'enable_back_orders');
            if (!ifExist6) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'enable_back_orders',
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
            yield queryRunner.dropColumn('product', 'enable_back_orders');
            yield queryRunner.dropColumn('product', 'max_quantity_allowed_cart');
            yield queryRunner.dropColumn('product', 'min_quantity_allowed_cart');
            yield queryRunner.dropColumn('product', 'notify_min_quantity_below');
            yield queryRunner.dropColumn('product', 'out_of_stock_threshold');
            yield queryRunner.dropColumn('product', 'has_stock');
            yield queryRunner.dropColumn('product', 'has_stire_price');
        });
    }
}
exports.AddColumnInProductTable1589003393774 = AddColumnInProductTable1589003393774;
//# sourceMappingURL=1589003393774-AddColumnInProductTable.js.map