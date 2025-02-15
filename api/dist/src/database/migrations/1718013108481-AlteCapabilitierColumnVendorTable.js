"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlteCapabilitierColumnVendorTable1718013108481 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlteCapabilitierColumnVendorTable1718013108481 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'capabilities');
            if (columnExist) {
                yield (0, typeorm_1.getRepository)('Vendor').update({}, {
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