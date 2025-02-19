"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVendorTable1718019286973 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVendorTable1718019286973 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'vendor_description');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'vendor_description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
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
exports.AddColumnVendorTable1718019286973 = AddColumnVendorTable1718019286973;
//# sourceMappingURL=1718019286973-AddColumnVendorTable.js.map