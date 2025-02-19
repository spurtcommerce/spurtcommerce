"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVendorToSellerNamePermission1732687090046 = void 0;
const tslib_1 = require("tslib");
class UpdateVendorToSellerNamePermission1732687090046 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            UPDATE permission_module
            SET
                name = REPLACE(name, 'Vendor', 'Seller')
            WHERE
                name LIKE '%Vendor%';
        `);
            yield queryRunner.query(`
            UPDATE permission_module_group
            SET
                name = REPLACE(name, 'Vendor', 'Seller')
            WHERE
                name LIKE '%Vendor%';
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateVendorToSellerNamePermission1732687090046 = UpdateVendorToSellerNamePermission1732687090046;
//# sourceMappingURL=1732687090046-UpdateVendorToSellerNamePermission.js.map