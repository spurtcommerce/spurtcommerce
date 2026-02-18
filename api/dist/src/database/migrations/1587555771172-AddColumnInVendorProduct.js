"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorProduct1587555771172 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorProduct1587555771172 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_product', 'pincode_based_delivery');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_product', new typeorm_1.TableColumn({
                    name: 'pincode_based_delivery',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 1,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_product', 'pincode_based_delivery');
        });
    }
}
exports.AddColumnInVendorProduct1587555771172 = AddColumnInVendorProduct1587555771172;
//# sourceMappingURL=1587555771172-AddColumnInVendorProduct.js.map