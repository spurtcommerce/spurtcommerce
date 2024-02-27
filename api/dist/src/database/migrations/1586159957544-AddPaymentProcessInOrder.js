"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPaymentProcessInOrder1586159957544 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddPaymentProcessInOrder1586159957544 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order', 'payment_process');
            if (!ifExist) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'payment_process',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 1,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order', 'payment_process');
        });
    }
}
exports.AddPaymentProcessInOrder1586159957544 = AddPaymentProcessInOrder1586159957544;
//# sourceMappingURL=1586159957544-AddPaymentProcessInOrder.js.map