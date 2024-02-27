"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorTable1590393542054 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorTable1590393542054 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor', 'vendor_slug_name');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'vendor_slug_name',
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
            yield queryRunner.dropColumn('vendor', 'vendor_slug_name');
        });
    }
}
exports.AddColumnInVendorTable1590393542054 = AddColumnInVendorTable1590393542054;
//# sourceMappingURL=1590393542054-AddColumnInVendorTable.js.map