"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCODLogo1747114024567 = void 0;
const tslib_1 = require("tslib");
class UpdateCODLogo1747114024567 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`UPDATE plugins
            SET plugin_avatar = 'cod payment_1747113838765.png'
            WHERE slug_name = 'cash-on-delivery';`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateCODLogo1747114024567 = UpdateCODLogo1747114024567;
//# sourceMappingURL=1747114024567-UpdateCODLogo.js.map