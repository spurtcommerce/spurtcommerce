"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropForignKeyCustomerCartTable1720503529178 = void 0;
const tslib_1 = require("tslib");
class DropForignKeyCustomerCartTable1720503529178 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('customer_cart');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.query(`ALTER TABLE customer_cart DROP FOREIGN KEY fk_customer_cart_customer_customer_id`);
            }
            yield queryRunner.query(`UPDATE customer_cart SET customer_id= 0 WHERE customer_id IS NULL`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.DropForignKeyCustomerCartTable1720503529178 = DropForignKeyCustomerCartTable1720503529178;
//# sourceMappingURL=1720503529178-DropForignKeyCustomerCartTable.js.map