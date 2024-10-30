"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVendorTable1722491768166 = void 0;
const tslib_1 = require("tslib");
class UpdateVendorTable1722491768166 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasColumn('vendor', 'personalized_settings');
            if (exist) {
                yield queryRunner.query(`
                UPDATE \`vendor\`
                SET \`personalized_settings\` = '{ "timeZone": "", "dateFormat": "", "timeFormat": "", "defaultLanguage": 0 }'
                WHERE \`personalized_settings\` IS NULL;
            `);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateVendorTable1722491768166 = UpdateVendorTable1722491768166;
//# sourceMappingURL=1722491768166-UpdateVendorTable.js.map