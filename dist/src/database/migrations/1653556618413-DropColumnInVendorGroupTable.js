"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropColumnInVendorGroupTable1653556618413 = void 0;
const tslib_1 = require("tslib");
class DropColumnInVendorGroupTable1653556618413 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `vendor_group` DROP COLUMN `color_code`');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `vendor_group` DROP COLUMN `color_code`');
        });
    }
}
exports.DropColumnInVendorGroupTable1653556618413 = DropColumnInVendorGroupTable1653556618413;
//# sourceMappingURL=1653556618413-DropColumnInVendorGroupTable.js.map