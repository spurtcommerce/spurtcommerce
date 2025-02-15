"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInVendorContactTable1657176040087 = void 0;
const tslib_1 = require("tslib");
class AlterColumnInVendorContactTable1657176040087 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `vendor_contact` CHANGE `phone_number` `phone_number` VARCHAR(255)');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `vendor_contact` CHANGE `phone_number` `phone_number` VARCHAR(255)');
        });
    }
}
exports.AlterColumnInVendorContactTable1657176040087 = AlterColumnInVendorContactTable1657176040087;
//# sourceMappingURL=1657176040087-AlterColumnInVendorContactTable.js.map