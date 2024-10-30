"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnBannerPositionToString1728280823149 = void 0;
const tslib_1 = require("tslib");
class AlterColumnBannerPositionToString1728280823149 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Alter the 'position' column to type 'varchar'
            yield queryRunner.query(`ALTER TABLE banner MODIFY position VARCHAR(155) null;`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnBannerPositionToString1728280823149 = AlterColumnBannerPositionToString1728280823149;
//# sourceMappingURL=1728280823149-AlterColumnBannerPositionToString.js.map