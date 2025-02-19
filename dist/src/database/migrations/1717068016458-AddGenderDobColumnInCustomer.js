"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddGenderDobColumnInCustomer1717068016458 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddGenderDobColumnInCustomer1717068016458 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist1 = yield queryRunner.hasColumn('customer', 'gender');
            if (!columnExist1) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'gender',
                    type: 'varchar',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist2 = yield queryRunner.hasColumn('customer', 'dob');
            if (!columnExist2) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'dob',
                    type: 'date',
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
exports.AddGenderDobColumnInCustomer1717068016458 = AddGenderDobColumnInCustomer1717068016458;
//# sourceMappingURL=1717068016458-AddGenderDobColumnInCustomer.js.map