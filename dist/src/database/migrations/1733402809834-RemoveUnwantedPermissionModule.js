"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUnwantedPermissionModule1733402809834 = void 0;
const tslib_1 = require("tslib");
class RemoveUnwantedPermissionModule1733402809834 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DELETE FROM permission_module_group
            WHERE slug_name IN ('settings-delivery-location', 'buyer-group', 'settings-stock-status', 'sales-archive-payment', 'sales-inventory', 'sales-quotation-request', 'variant-stock-update', 'bulk-import-mapping', 'bulk-product-imports', 'market-place-sales');
        `);
            yield queryRunner.query(`
            DELETE FROM permission_module
            WHERE slug_name IN ('attribute-settings', 'variant-settings', 'audit-log-single-excel');
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.RemoveUnwantedPermissionModule1733402809834 = RemoveUnwantedPermissionModule1733402809834;
//# sourceMappingURL=1733402809834-RemoveUnwantedPermissionModule.js.map