"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorOrderLog1581678039045 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorOrderLog1581678039045 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_orders_log', 'total');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_orders_log', new typeorm_1.TableColumn({
                    name: 'total',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_orders_log', 'total');
        });
    }
}
exports.AddColumnInVendorOrderLog1581678039045 = AddColumnInVendorOrderLog1581678039045;
//# sourceMappingURL=1581678039045-AddColumnInVendorOrderLog.js.map