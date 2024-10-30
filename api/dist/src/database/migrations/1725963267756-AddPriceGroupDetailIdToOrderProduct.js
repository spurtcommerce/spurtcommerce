"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPriceGroupDetailIdToOrderProduct1725963267756 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddPriceGroupDetailIdToOrderProduct1725963267756 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                name: 'price_group_detail_id',
                type: 'int',
                isNullable: true, // Change this to false if you want it to be required
            }));
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order_product', 'price_group_detail_id');
        });
    }
}
exports.AddPriceGroupDetailIdToOrderProduct1725963267756 = AddPriceGroupDetailIdToOrderProduct1725963267756;
//# sourceMappingURL=1725963267756-AddPriceGroupDetailIdToOrderProduct.js.map