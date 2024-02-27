"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCustomerTable1620989942663 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCustomerTable1620989942663 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist3 = yield queryRunner.hasColumn('customer', 'locked_on');
            if (!ifExist3) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'locked_on',
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
            yield queryRunner.dropColumn('customer', 'locked_on');
        });
    }
}
exports.AddColumnInCustomerTable1620989942663 = AddColumnInCustomerTable1620989942663;
//# sourceMappingURL=1620989942663-AddColumnInCustomerTable.js.map