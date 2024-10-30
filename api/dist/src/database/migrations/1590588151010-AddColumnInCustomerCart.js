"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCustomerCart1590588151010 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCustomerCart1590588151010 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('customer_cart', 'tire_price');
            if (!ifExist) {
                yield queryRunner.addColumn('customer_cart', new typeorm_1.TableColumn({
                    name: 'tire_price',
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
            yield queryRunner.dropColumn('vendor', 'vendor_slug_name');
        });
    }
}
exports.AddColumnInCustomerCart1590588151010 = AddColumnInCustomerCart1590588151010;
//# sourceMappingURL=1590588151010-AddColumnInCustomerCart.js.map