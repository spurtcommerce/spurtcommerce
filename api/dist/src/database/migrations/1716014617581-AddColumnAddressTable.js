"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnAddressTable1716014617581 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnAddressTable1716014617581 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('address', 'landmark');
            if (!ifExist) {
                yield queryRunner.addColumn('address', new typeorm_1.TableColumn({
                    name: 'landmark',
                    type: 'varchar',
                    length: '100',
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
exports.AddColumnAddressTable1716014617581 = AddColumnAddressTable1716014617581;
//# sourceMappingURL=1716014617581-AddColumnAddressTable.js.map