"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnOrderProductPreIdInOrderProduct1582355584324 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterColumnOrderProductPreIdInOrderProduct1582355584324 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistt = yield queryRunner.hasColumn('order_product', 'order_product_prefix_id');
            if (!ifExistt) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'order_product_prefix_id',
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
            yield queryRunner.query('ALTER TABLE `order_product` CHANGE `order_product_prefix_id` `order_product_prefix_id` varchar(255) DEFAULT NULL');
        });
    }
}
exports.AlterColumnOrderProductPreIdInOrderProduct1582355584324 = AlterColumnOrderProductPreIdInOrderProduct1582355584324;
//# sourceMappingURL=1582355584324-AlterColumnOrderProductPreIdInOrderProduct.js.map