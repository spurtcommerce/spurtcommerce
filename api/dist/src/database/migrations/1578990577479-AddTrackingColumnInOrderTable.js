"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTrackingColumnInOrderTable1578990577479 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddTrackingColumnInOrderTable1578990577479 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order', 'tracking_url');
            const ifExistt = yield queryRunner.hasColumn('order', 'tracking_no');
            const ifExit = yield queryRunner.hasColumn('order', 'payment_status');
            if (!ifExist) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'tracking_url',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            if (!ifExistt) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'tracking_no',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            if (!ifExit) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'payment_status',
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
            yield queryRunner.dropColumn('order', 'tracking_url');
            yield queryRunner.dropColumn('order', 'tracking_no');
        });
    }
}
exports.AddTrackingColumnInOrderTable1578990577479 = AddTrackingColumnInOrderTable1578990577479;
//# sourceMappingURL=1578990577479-AddTrackingColumnInOrderTable.js.map