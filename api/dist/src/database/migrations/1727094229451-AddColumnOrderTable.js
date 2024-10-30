"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnOrderTable1727094229451 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnOrderTable1727094229451 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnCheck = yield queryRunner.hasColumn('order', 'payment_mobile_number');
            if (!columnCheck) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'payment_mobile_number',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
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
exports.AddColumnOrderTable1727094229451 = AddColumnOrderTable1727094229451;
//# sourceMappingURL=1727094229451-AddColumnOrderTable.js.map