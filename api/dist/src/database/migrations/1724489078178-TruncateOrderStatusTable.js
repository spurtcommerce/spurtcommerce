"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruncateOrderStatusTable1724489078178 = void 0;
const tslib_1 = require("tslib");
class TruncateOrderStatusTable1724489078178 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('DELETE from order_product WHERE order_status_id > 1');
            yield queryRunner.query('DELETE from order_status WHERE order_status_id > 1');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.TruncateOrderStatusTable1724489078178 = TruncateOrderStatusTable1724489078178;
//# sourceMappingURL=1724489078178-TruncateOrderStatusTable.js.map