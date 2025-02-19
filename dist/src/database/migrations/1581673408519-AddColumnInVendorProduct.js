"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorProduct1581673408519 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorProduct1581673408519 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_product', 'vendor_product_commission');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_product', new typeorm_1.TableColumn({
                    name: 'vendor_product_commission',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_product', 'vendor_product_commission');
        });
    }
}
exports.AddColumnInVendorProduct1581673408519 = AddColumnInVendorProduct1581673408519;
//# sourceMappingURL=1581673408519-AddColumnInVendorProduct.js.map