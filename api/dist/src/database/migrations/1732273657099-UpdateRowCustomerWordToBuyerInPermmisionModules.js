"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRowCustomerWordToBuyerInPermmisionModules1732273657099 = void 0;
const tslib_1 = require("tslib");
class UpdateRowCustomerWordToBuyerInPermmisionModules1732273657099 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            UPDATE permission_module
            SET
                name = REPLACE(name, 'Customer', 'Buyer'),
                slug_name = REPLACE(slug_name, 'customer', 'buyer')
            WHERE
                name LIKE '%Customer%' OR
                slug_name LIKE '%customer%';
        `);
            yield queryRunner.query(`
            UPDATE permission_module_group
            SET
                name = REPLACE(name, 'Customer', 'Buyer'),
                slug_name = REPLACE(slug_name, 'customer', 'buyer')
            WHERE
                name LIKE '%Customer%' OR
                slug_name LIKE '%customer%';
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateRowCustomerWordToBuyerInPermmisionModules1732273657099 = UpdateRowCustomerWordToBuyerInPermmisionModules1732273657099;
//# sourceMappingURL=1732273657099-UpdateRowCustomerWordToBuyerInPermmisionModules.js.map