"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderProduct1603687495819 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderProduct1603687495819 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order_product', 'varient_name');
            if (!ifExist) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'varient_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('order_product', 'product_varient_option_id');
            if (!ifExist1) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'product_varient_option_id',
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
            yield queryRunner.dropColumn('order_product', 'varient_name');
            yield queryRunner.dropColumn('order_product', 'product_varient_option_id');
        });
    }
}
exports.AddColumnInOrderProduct1603687495819 = AddColumnInOrderProduct1603687495819;
//# sourceMappingURL=1603687495819-AddColumnInOrderProduct.js.map