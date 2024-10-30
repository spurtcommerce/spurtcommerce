"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameColumnVendorMedia1718082476223 = void 0;
const tslib_1 = require("tslib");
class RenameColumnVendorMedia1718082476223 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasColumn('vendor_media', 'show_home_page_widget');
            if (exist) {
                yield queryRunner.renameColumn('vendor_media', 'show_home_page_widget', 'show_home_page');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.RenameColumnVendorMedia1718082476223 = RenameColumnVendorMedia1718082476223;
//# sourceMappingURL=1718082476223-RenameColumnVendorMedia.js.map