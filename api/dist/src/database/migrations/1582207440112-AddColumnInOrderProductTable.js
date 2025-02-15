"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderProductTable1582207440112 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderProductTable1582207440112 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistt = yield queryRunner.hasColumn('product', 'order_product_prefix_id');
            if (!ifExistt) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
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
            yield queryRunner.dropColumn('product', 'order_product_prefix_id');
        });
    }
}
exports.AddColumnInOrderProductTable1582207440112 = AddColumnInOrderProductTable1582207440112;
//# sourceMappingURL=1582207440112-AddColumnInOrderProductTable.js.map