"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumntoVendorGroup1652418662962 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumntoVendorGroup1652418662962 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const column = new typeorm_1.TableColumn({
                name: 'vendor_group_commission',
                type: 'Decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: false,
            });
            const table = yield queryRunner.getTable('vendor_group');
            if (table) {
                yield queryRunner.addColumn(table, column);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_group', 'vendor_group_commission');
        });
    }
}
exports.AddColumntoVendorGroup1652418662962 = AddColumntoVendorGroup1652418662962;
//# sourceMappingURL=1652418662962-AddColumntoVendorGroup.js.map