"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingColumnsInOrderStatus1643700945763 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddingColumnsInOrderStatus1643700945763 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistParentId = yield queryRunner.hasColumn('order_status', 'parent_id');
            if (!ifExistParentId) {
                yield queryRunner.addColumn('order_status', new typeorm_1.TableColumn({
                    name: 'parent_id',
                    type: 'integer',
                    length: '11',
                    default: 0,
                    isPrimary: false,
                    isNullable: false,
                }));
            }
            const ifExistIsAdmin = yield queryRunner.hasColumn('order_status', 'is_admin');
            if (!ifExistIsAdmin) {
                yield queryRunner.addColumn('order_status', new typeorm_1.TableColumn({
                    name: 'is_admin',
                    type: 'integer',
                    length: '11',
                    default: 1,
                    isPrimary: false,
                    isNullable: false,
                }));
            }
            const ifExistIsVendor = yield queryRunner.hasColumn('order_status', 'is_vendor');
            if (!ifExistIsVendor) {
                yield queryRunner.addColumn('order_status', new typeorm_1.TableColumn({
                    name: 'is_vendor',
                    type: 'integer',
                    length: '11',
                    default: 1,
                    isPrimary: false,
                    isNullable: false,
                }));
            }
            const ifExistIsBuyer = yield queryRunner.hasColumn('order_status', 'is_buyer');
            if (!ifExistIsBuyer) {
                yield queryRunner.addColumn('order_status', new typeorm_1.TableColumn({
                    name: 'is_buyer',
                    type: 'integer',
                    length: '11',
                    default: 1,
                    isPrimary: false,
                    isNullable: false,
                }));
            }
            const ifExistIsApi = yield queryRunner.hasColumn('order_status', 'is_api');
            if (!ifExistIsApi) {
                yield queryRunner.addColumn('order_status', new typeorm_1.TableColumn({
                    name: 'is_api',
                    type: 'integer',
                    length: '11',
                    default: 1,
                    isPrimary: false,
                    isNullable: false,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order_status', 'parent_id');
            yield queryRunner.dropColumn('order_status', 'is_admin');
            yield queryRunner.dropColumn('order_status', 'is_vendor');
            yield queryRunner.dropColumn('order_status', 'is_buyer');
            yield queryRunner.dropColumn('order_status', 'is_api');
        });
    }
}
exports.AddingColumnsInOrderStatus1643700945763 = AddingColumnsInOrderStatus1643700945763;
//# sourceMappingURL=1643700945763-AddingColumnsInOrderStatus.js.map