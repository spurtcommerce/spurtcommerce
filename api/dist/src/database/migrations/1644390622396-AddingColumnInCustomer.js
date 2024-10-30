"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingColumnInCustomer1644390622396 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddingColumnInCustomer1644390622396 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('customer', 'forget_password_link_expires');
            if (!ifExist) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'forget_password_link_expires',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('customer', 'forget_password_link_expires');
        });
    }
}
exports.AddingColumnInCustomer1644390622396 = AddingColumnInCustomer1644390622396;
//# sourceMappingURL=1644390622396-AddingColumnInCustomer.js.map