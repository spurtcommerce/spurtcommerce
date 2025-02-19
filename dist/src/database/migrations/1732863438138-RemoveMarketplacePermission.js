"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveMarketplacePermission1732863438138 = void 0;
const tslib_1 = require("tslib");
class RemoveMarketplacePermission1732863438138 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DELETE FROM permission_module
            WHERE slug_name IN ('create-market-place-product', 'edit-market-place-product', 'delete-market-place-product', 'delete-failed-order', 'delete-order');
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.RemoveMarketplacePermission1732863438138 = RemoveMarketplacePermission1732863438138;
//# sourceMappingURL=1732863438138-RemoveMarketplacePermission.js.map