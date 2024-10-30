"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnNameVendor1717141959627 = void 0;
const tslib_1 = require("tslib");
class AlterColumnNameVendor1717141959627 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasColumn('vendor', 'cheque_payee_name');
            if (exist) {
                yield queryRunner.renameColumn('vendor', 'cheque_payee_name', 'business_segment');
            }
            const exist2 = yield queryRunner.hasColumn('vendor', 'paypal_email_account');
            if (exist2) {
                yield queryRunner.renameColumn('vendor', 'paypal_email_account', 'business_type');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnNameVendor1717141959627 = AlterColumnNameVendor1717141959627;
//# sourceMappingURL=1717141959627-AlterColumnNameVendor.js.map