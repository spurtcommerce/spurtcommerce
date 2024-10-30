"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVendorColumn1697697385554 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddVendorColumn1697697385554 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor', 'whatsapp');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'whatsapp',
                    type: 'VARCHAR',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExistColumn = yield queryRunner.hasColumn('vendor', 'ifsc_code');
            if (!ifExistColumn) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'ifsc_code',
                    type: 'VARCHAR',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor', 'whatsapp');
            yield queryRunner.dropColumn('vendor', 'ifsc_code');
        });
    }
}
exports.AddVendorColumn1697697385554 = AddVendorColumn1697697385554;
//# sourceMappingURL=1697697385554-AddVendorColumn.js.map