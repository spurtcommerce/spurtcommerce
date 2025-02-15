"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumVendorProduct1691219734490 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumVendorProduct1691219734490 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const hasColumnName = yield queryRunner.hasColumn('vendor_product', 'common_product_date');
            if (!hasColumnName) {
                yield queryRunner.addColumn('vendor_product', new typeorm_1.TableColumn({
                    name: 'common_product_date',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_product', 'common_product_date');
        });
    }
}
exports.AddColumVendorProduct1691219734490 = AddColumVendorProduct1691219734490;
//# sourceMappingURL=1691219734490-AddColumVendorProduct.js.map