"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderTable1605506261235 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderTable1605506261235 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist3 = yield queryRunner.hasColumn('order', 'customer_gst_no');
            if (!ifExist3) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'customer_gst_no',
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
            yield queryRunner.dropColumn('order', 'customer_gst_no');
        });
    }
}
exports.AddColumnInOrderTable1605506261235 = AddColumnInOrderTable1605506261235;
//# sourceMappingURL=1605506261235-AddColumnInOrderTable.js.map