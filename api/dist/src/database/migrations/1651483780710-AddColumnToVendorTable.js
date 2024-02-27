"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnToVendorTable1651483780710 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnToVendorTable1651483780710 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor', 'vendor_group_id');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'vendor_group_id',
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor', 'vendor_group_id');
        });
    }
}
exports.AddColumnToVendorTable1651483780710 = AddColumnToVendorTable1651483780710;
//# sourceMappingURL=1651483780710-AddColumnToVendorTable.js.map