"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderStatus1655465438730 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderStatus1655465438730 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order_status', 'default_status');
            if (!ifExist) {
                yield queryRunner.addColumn('order_status', new typeorm_1.TableColumn({
                    name: 'default_status',
                    type: 'INTEGER  ',
                    isPrimary: false,
                    isNullable: false,
                    default: '0',
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
exports.AddColumnInOrderStatus1655465438730 = AddColumnInOrderStatus1655465438730;
//# sourceMappingURL=1655465438730-AddColumnInOrderStatus.js.map