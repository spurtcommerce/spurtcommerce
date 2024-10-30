"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVendorTable1718004573878 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVendorTable1718004573878 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'capabilities');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'capabilities',
                    type: 'json',
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
exports.AddColumnVendorTable1718004573878 = AddColumnVendorTable1718004573878;
//# sourceMappingURL=1718004573878-AddColumnVendorTable.js.map