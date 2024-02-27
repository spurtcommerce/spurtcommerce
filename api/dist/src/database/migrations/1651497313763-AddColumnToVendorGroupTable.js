"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnToVendorGroupTable1651497313763 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnToVendorGroupTable1651497313763 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_group', 'color_code');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_group', new typeorm_1.TableColumn({
                    name: 'color_code',
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
            yield queryRunner.dropColumn('vendor_group', 'color_code');
        });
    }
}
exports.AddColumnToVendorGroupTable1651497313763 = AddColumnToVendorGroupTable1651497313763;
//# sourceMappingURL=1651497313763-AddColumnToVendorGroupTable.js.map