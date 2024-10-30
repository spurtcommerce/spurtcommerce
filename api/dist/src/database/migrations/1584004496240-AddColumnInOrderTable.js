"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderTable1584004496240 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderTable1584004496240 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order', 'coupon_code');
            if (!ifExist) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'coupon_code',
                    type: 'varchar',
                    length: '45',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('order', 'discount_amount');
            if (!ifExist1) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'discount_amount',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('order', 'amount');
            if (!ifExist2) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'amount',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order', 'coupon_code');
            yield queryRunner.dropColumn('order', 'discount_amount');
            yield queryRunner.dropColumn('order', 'amount');
        });
    }
}
exports.AddColumnInOrderTable1584004496240 = AddColumnInOrderTable1584004496240;
//# sourceMappingURL=1584004496240-AddColumnInOrderTable.js.map