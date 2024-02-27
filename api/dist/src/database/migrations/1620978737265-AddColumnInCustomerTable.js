"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCustomerTable1620978737265 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCustomerTable1620978737265 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist3 = yield queryRunner.hasColumn('customer', 'forget_password_key');
            if (!ifExist3) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'forget_password_key',
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
            yield queryRunner.dropColumn('customer', 'forget_password_key');
        });
    }
}
exports.AddColumnInCustomerTable1620978737265 = AddColumnInCustomerTable1620978737265;
//# sourceMappingURL=1620978737265-AddColumnInCustomerTable.js.map