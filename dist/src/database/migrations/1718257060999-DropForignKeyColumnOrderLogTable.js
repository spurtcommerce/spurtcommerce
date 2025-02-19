"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropForignKeyColumnOrderLogTable1718257060999 = void 0;
const tslib_1 = require("tslib");
class DropForignKeyColumnOrderLogTable1718257060999 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order_log');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.query(`ALTER TABLE order_log DROP FOREIGN KEY fk_order_log_customer_customer_id`);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.DropForignKeyColumnOrderLogTable1718257060999 = DropForignKeyColumnOrderLogTable1718257060999;
//# sourceMappingURL=1718257060999-DropForignKeyColumnOrderLogTable.js.map