"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrder1555507207067 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrder1555507207067 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order', 'order_prefix_id');
            if (!ifExist) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'order_prefix_id',
                    type: 'varchar',
                    length: '45',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order', 'order_prefix_id');
        });
    }
}
exports.AddColumnInOrder1555507207067 = AddColumnInOrder1555507207067;
//# sourceMappingURL=1555507207067-AddColumnInOrder.js.map