"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderStatus1574401863885 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderStatus1574401863885 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order_status', 'priority');
            if (!ifExist) {
                yield queryRunner.addColumn('order_status', new typeorm_1.TableColumn({
                    name: 'priority',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order_status', 'priority');
        });
    }
}
exports.AddColumnInOrderStatus1574401863885 = AddColumnInOrderStatus1574401863885;
//# sourceMappingURL=1574401863885-AddColumnInOrderStatus.js.map