"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVendorDocument1718169436453 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVendorDocument1718169436453 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor_document', 'additional_info');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor_document', new typeorm_1.TableColumn({
                    name: 'additional_info',
                    type: 'json',
                    isPrimary: false,
                    isNullable: true,
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
exports.AddColumnVendorDocument1718169436453 = AddColumnVendorDocument1718169436453;
//# sourceMappingURL=1718169436453-AddColumnVendorDocument.js.map