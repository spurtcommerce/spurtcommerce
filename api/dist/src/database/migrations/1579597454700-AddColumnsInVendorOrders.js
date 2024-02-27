"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnsInVendorOrders1579597454700 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnsInVendorOrders1579597454700 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_orders', 'tracking_url');
            const ifExistt = yield queryRunner.hasColumn('vendor_orders', 'tracking_no');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_orders', new typeorm_1.TableColumn({
                    name: 'tracking_url',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            if (!ifExistt) {
                yield queryRunner.addColumn('vendor_orders', new typeorm_1.TableColumn({
                    name: 'tracking_no',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_orders', 'tracking_url');
            yield queryRunner.dropColumn('vendor_orders', 'tracking_no');
        });
    }
}
exports.AddColumnsInVendorOrders1579597454700 = AddColumnsInVendorOrders1579597454700;
//# sourceMappingURL=1579597454700-AddColumnsInVendorOrders.js.map