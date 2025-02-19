"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropForignKeyColumnOrderTable1718254680960 = void 0;
const tslib_1 = require("tslib");
class DropForignKeyColumnOrderTable1718254680960 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order');
            if (table) {
                yield queryRunner.query(`ALTER TABLE \`order\` DROP INDEX fk_order_customer1`);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.DropForignKeyColumnOrderTable1718254680960 = DropForignKeyColumnOrderTable1718254680960;
//# sourceMappingURL=1718254680960-DropForignKeyColumnOrderTable.js.map