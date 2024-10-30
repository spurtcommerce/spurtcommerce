"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVendorCustomerForeignKey1721049011047 = void 0;
const tslib_1 = require("tslib");
class UpdateVendorCustomerForeignKey1721049011047 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DELETE FROM vendor
            WHERE customer_id NOT IN (SELECT id FROM customer)
        `);
            yield queryRunner.query(`
            ALTER TABLE vendor
            ADD CONSTRAINT fk_vendor_customer_customer_id
            FOREIGN KEY (customer_id) REFERENCES customer(id)
            ON DELETE CASCADE;
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateVendorCustomerForeignKey1721049011047 = UpdateVendorCustomerForeignKey1721049011047;
//# sourceMappingURL=1721049011047-UpdateVendorCustomerForeignKey.js.map