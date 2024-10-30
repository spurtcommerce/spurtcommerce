"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnAddressTable1718002897826 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnAddressTable1718002897826 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('address', 'is_default');
            if (!columnExist) {
                yield queryRunner.addColumn('address', new typeorm_1.TableColumn({
                    name: 'is_default',
                    type: 'tinyint',
                    default: 0,
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            yield queryRunner.query('UPDATE `address` SET `is_default` = 0 WHERE `is_default` IS NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnAddressTable1718002897826 = AddColumnAddressTable1718002897826;
//# sourceMappingURL=1718002897826-AddColumnAddressTable.js.map