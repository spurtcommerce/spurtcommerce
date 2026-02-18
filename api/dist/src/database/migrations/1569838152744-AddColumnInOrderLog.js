"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderLog1569838152744 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderLog1569838152744 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order_log', 'orderId');
            if (!ifExist) {
                yield queryRunner.addColumn('order_log', new typeorm_1.TableColumn({
                    name: 'orderId',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            yield queryRunner.query('ALTER TABLE `order_log` CHANGE `total` `total` decimal(15,2) DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order_log', 'orderId');
        });
    }
}
exports.AddColumnInOrderLog1569838152744 = AddColumnInOrderLog1569838152744;
//# sourceMappingURL=1569838152744-AddColumnInOrderLog.js.map