"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnCartTable1755767460867 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCollumnCartTable1755767460867 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('customer_cart', 'product_type');
            if (!columnExist) {
                yield queryRunner.addColumn('customer_cart', new typeorm_1.TableColumn({
                    name: 'product_type',
                    type: 'enum',
                    enum: ['physical', 'virtual'],
                    isNullable: true,
                }));
                yield queryRunner.query(`UPDATE customer_cart
                SET product_type = 'physical';`);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddCollumnCartTable1755767460867 = AddCollumnCartTable1755767460867;
//# sourceMappingURL=1755767460867-AddCollumnCartTable.js.map