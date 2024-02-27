"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorOrder1604489633939 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorOrder1604489633939 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_orders', 'make_settlement');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_orders', new typeorm_1.TableColumn({
                    name: 'make_settlement',
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
            yield queryRunner.dropColumn('vendor_orders', 'make_settlement');
        });
    }
}
exports.AddColumnInVendorOrder1604489633939 = AddColumnInVendorOrder1604489633939;
//# sourceMappingURL=1604489633939-AddColumnInVendorOrder.js.map