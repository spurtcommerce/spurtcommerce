"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVendorMediaTable1718687733730 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVendorMediaTable1718687733730 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor_media', 'title');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor_media', new typeorm_1.TableColumn({
                    name: 'title',
                    type: 'varchar',
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
exports.AddColumnVendorMediaTable1718687733730 = AddColumnVendorMediaTable1718687733730;
//# sourceMappingURL=1718687733730-AddColumnVendorMediaTable.js.map