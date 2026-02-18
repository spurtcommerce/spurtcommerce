"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderProductTable1584011252176 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderProductTable1584011252176 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order_product', 'discount_amount');
            if (!ifExist) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'discount_amount',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('order_product', 'discounted_amount');
            if (!ifExist1) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'discounted_amount',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order_product', 'discount_amount');
        });
    }
}
exports.AddColumnInOrderProductTable1584011252176 = AddColumnInOrderProductTable1584011252176;
//# sourceMappingURL=1584011252176-AddColumnInOrderProductTable.js.map