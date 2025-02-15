"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderProduct1582898256691 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderProduct1582898256691 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order_product', 'base_price');
            if (!ifExist) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'base_price',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('order_product', 'tax_type');
            if (!ifExist1) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'tax_type',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('order_product', 'tax_value');
            if (!ifExist2) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'tax_value',
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
            yield queryRunner.dropColumn('order_product', 'tax_value');
        });
    }
}
exports.AddColumnInOrderProduct1582898256691 = AddColumnInOrderProduct1582898256691;
//# sourceMappingURL=1582898256691-AddColumnInOrderProduct.js.map