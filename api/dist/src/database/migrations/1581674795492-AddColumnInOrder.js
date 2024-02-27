"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrder1581674795492 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrder1581674795492 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order', 'payment_type');
            if (!ifExist) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'payment_type',
                    type: 'varchar',
                    length: '45',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExisttt = yield queryRunner.hasColumn('order', 'payment_details');
            if (!ifExisttt) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'payment_details',
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
            yield queryRunner.dropColumn('order', 'payment_type');
            yield queryRunner.dropColumn('order', 'payment_details');
        });
    }
}
exports.AddColumnInOrder1581674795492 = AddColumnInOrder1581674795492;
//# sourceMappingURL=1581674795492-AddColumnInOrder.js.map