"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnIsDeleteInVendorDocument1716363600120 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnIsDeleteInVendorDocument1716363600120 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist1 = yield queryRunner.hasColumn('vendor_document', 'is_delete');
            if (!columnExist1) {
                yield queryRunner.addColumn('vendor_document', new typeorm_1.TableColumn({
                    name: 'is_delete',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
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
exports.AddColumnIsDeleteInVendorDocument1716363600120 = AddColumnIsDeleteInVendorDocument1716363600120;
//# sourceMappingURL=1716363600120-AddColumnIsDeleteInVendorDocument.js.map