"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameColumnVendorMedia1718170831118 = void 0;
const tslib_1 = require("tslib");
class RenameColumnVendorMedia1718170831118 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasColumn('vendor_media', 'fileName');
            if (exist) {
                yield queryRunner.renameColumn('vendor_media', 'fileName', 'file_name');
            }
            const exist2 = yield queryRunner.hasColumn('vendor_media', 'filePath');
            if (exist2) {
                yield queryRunner.renameColumn('vendor_media', 'filePath', 'file_Path');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.RenameColumnVendorMedia1718170831118 = RenameColumnVendorMedia1718170831118;
//# sourceMappingURL=1718170831118-RenameColumnVendorMedia.js.map