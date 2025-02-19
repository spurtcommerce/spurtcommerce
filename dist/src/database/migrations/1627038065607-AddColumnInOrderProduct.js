"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderProduct1627038065607 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderProduct1627038065607 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistCreatedDate = yield queryRunner.hasColumn('order_product', 'coupon_discount_amount');
            if (!ifExistCreatedDate) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'coupon_discount_amount',
                    type: 'decimal',
                    length: '16,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order_product', 'coupon_discount_amount');
        });
    }
}
exports.AddColumnInOrderProduct1627038065607 = AddColumnInOrderProduct1627038065607;
//# sourceMappingURL=1627038065607-AddColumnInOrderProduct.js.map