"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnIsVerifiedInVendorDocument1716809379847 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnIsVerifiedInVendorDocument1716809379847 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist1 = yield queryRunner.hasColumn('vendor_document', 'is_verified');
            if (!columnExist1) {
                yield queryRunner.addColumn('vendor_document', new typeorm_1.TableColumn({
                    name: 'is_verified',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    default: 0,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnIsVerifiedInVendorDocument1716809379847 = AddColumnIsVerifiedInVendorDocument1716809379847;
//# sourceMappingURL=1716809379847-AddColumnIsVerifiedInVendorDocument.js.map