"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMorethenOneSettingsData1748848626989 = void 0;
const tslib_1 = require("tslib");
class DeleteMorethenOneSettingsData1748848626989 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DELETE FROM settings
            WHERE is_active IS NULL OR is_active != 1
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.DeleteMorethenOneSettingsData1748848626989 = DeleteMorethenOneSettingsData1748848626989;
//# sourceMappingURL=1748848626989-DeleteMorethenOneSettingsData.js.map