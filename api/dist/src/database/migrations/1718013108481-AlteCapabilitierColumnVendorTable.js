"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlteCapabilitierColumnVendorTable1718013108481 = void 0;
const tslib_1 = require("tslib");
const Vendor_1 = require("../../api/core/models/Vendor");
class AlteCapabilitierColumnVendorTable1718013108481 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Repo = queryRunner.manager.getRepository(Vendor_1.Vendor);
            const columnExist = yield queryRunner.hasColumn('vendor', 'capabilities');
            if (columnExist) {
                yield Repo.update({}, {
                    capabilities: [{
                            data: '',
                            status: 1,
                        }],
                });
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlteCapabilitierColumnVendorTable1718013108481 = AlteCapabilitierColumnVendorTable1718013108481;
//# sourceMappingURL=1718013108481-AlteCapabilitierColumnVendorTable.js.map