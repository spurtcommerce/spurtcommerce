"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVendorProduct1727171401500 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVendorProduct1727171401500 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnCheck = yield queryRunner.hasColumn('vendor_product', 'reject_reason');
            if (!columnCheck) {
                yield queryRunner.addColumn('vendor_product', new typeorm_1.TableColumn({
                    name: 'reject_reason',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnVendorProduct1727171401500 = AddColumnVendorProduct1727171401500;
//# sourceMappingURL=1727171401500-AddColumnVendorProduct.js.map