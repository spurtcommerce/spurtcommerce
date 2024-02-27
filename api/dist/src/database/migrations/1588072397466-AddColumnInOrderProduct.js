"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderProduct1588072397466 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderProduct1588072397466 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order_product', 'cancel_request');
            if (!ifExist) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'cancel_request',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('order_product', 'cancel_request_status');
            if (!ifExist1) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'cancel_request_status',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('order_product', 'cancel_reason');
            if (!ifExist2) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'cancel_reason',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist3 = yield queryRunner.hasColumn('order_product', 'cancel_reason_description');
            if (!ifExist3) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'cancel_reason_description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order_product', 'cancel_reason');
            yield queryRunner.dropColumn('order_product', 'cancel_reason_description');
            yield queryRunner.dropColumn('order_product', 'cancel_request');
            yield queryRunner.dropColumn('order_product', 'cancel_request_status');
        });
    }
}
exports.AddColumnInOrderProduct1588072397466 = AddColumnInOrderProduct1588072397466;
//# sourceMappingURL=1588072397466-AddColumnInOrderProduct.js.map