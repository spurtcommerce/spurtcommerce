"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnRejectReasonLog1727501360353 = void 0;
const tslib_1 = require("tslib");
class AlterColumnRejectReasonLog1727501360353 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE vendor_product MODIFY reject_reason VARCHAR(255) null`);
            yield queryRunner.query(`UPDATE vendor_product SET reject_reason = NULL`);
            yield queryRunner.query(`ALTER TABLE vendor_product MODIFY reject_reason JSON`);
            yield queryRunner.query(`UPDATE vendor_product SET reject_reason = '[]'`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnRejectReasonLog1727501360353 = AlterColumnRejectReasonLog1727501360353;
//# sourceMappingURL=1727501360353-AlterColumnRejectReasonLog.js.map