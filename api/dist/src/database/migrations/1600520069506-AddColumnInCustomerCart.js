"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCustomerCart1600520069506 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCustomerCart1600520069506 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('customer_cart', 'product_option_value_id');
            if (!ifExist) {
                yield queryRunner.addColumn('customer_cart', new typeorm_1.TableColumn({
                    name: 'product_option_value_id',
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
            yield queryRunner.dropColumn('customer_cart', 'product_option_value_id');
        });
    }
}
exports.AddColumnInCustomerCart1600520069506 = AddColumnInCustomerCart1600520069506;
//# sourceMappingURL=1600520069506-AddColumnInCustomerCart.js.map