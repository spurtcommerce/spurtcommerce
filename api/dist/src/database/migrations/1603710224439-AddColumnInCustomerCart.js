"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCustomerCart1603710224439 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCustomerCart1603710224439 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('customer_cart', 'sku_name');
            if (!ifExist) {
                yield queryRunner.addColumn('customer_cart', new typeorm_1.TableColumn({
                    name: 'sku_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('customer_cart', 'varient_name');
            if (!ifExist1) {
                yield queryRunner.addColumn('customer_cart', new typeorm_1.TableColumn({
                    name: 'varient_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('customer_cart', 'product_varient_option_id');
            if (!ifExist2) {
                yield queryRunner.addColumn('customer_cart', new typeorm_1.TableColumn({
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
            yield queryRunner.dropColumn('customer_cart', 'sku_name');
            yield queryRunner.dropColumn('customer_cart', 'varient_name');
            yield queryRunner.dropColumn('customer_cart', 'product_varient_option_id');
        });
    }
}
exports.AddColumnInCustomerCart1603710224439 = AddColumnInCustomerCart1603710224439;
//# sourceMappingURL=1603710224439-AddColumnInCustomerCart.js.map