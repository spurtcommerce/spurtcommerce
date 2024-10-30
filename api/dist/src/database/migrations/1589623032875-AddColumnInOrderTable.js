"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderTable1589623032875 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderTable1589623032875 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order', 'back_orders');
            if (!ifExist) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'back_orders',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order', 'back_orders');
        });
    }
}
exports.AddColumnInOrderTable1589623032875 = AddColumnInOrderTable1589623032875;
//# sourceMappingURL=1589623032875-AddColumnInOrderTable.js.map