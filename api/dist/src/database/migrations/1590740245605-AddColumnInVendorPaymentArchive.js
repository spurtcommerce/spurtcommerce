"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorPaymentArchive1590740245605 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorPaymentArchive1590740245605 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_payment_archive', 'vendor_order_archive');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_payment_archive', new typeorm_1.TableColumn({
                    name: 'vendor_order_archive',
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
            yield queryRunner.dropColumn('vendor_payment_archive', 'order_archive');
        });
    }
}
exports.AddColumnInVendorPaymentArchive1590740245605 = AddColumnInVendorPaymentArchive1590740245605;
//# sourceMappingURL=1590740245605-AddColumnInVendorPaymentArchive.js.map