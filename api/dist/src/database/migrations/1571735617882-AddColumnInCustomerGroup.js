"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCustomerGroup1571735617882 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCustomerGroup1571735617882 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('customer_group', 'color_code');
            if (!ifExist) {
                yield queryRunner.addColumn('customer_group', new typeorm_1.TableColumn({
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
            yield queryRunner.dropColumn('customer_group', 'color_code');
        });
    }
}
exports.AddColumnInCustomerGroup1571735617882 = AddColumnInCustomerGroup1571735617882;
//# sourceMappingURL=1571735617882-AddColumnInCustomerGroup.js.map