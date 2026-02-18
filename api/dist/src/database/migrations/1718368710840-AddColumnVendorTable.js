"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVendorTable1718368710840 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVendorTable1718368710840 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'is_email_verify');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'is_email_verify',
                    type: 'tinyint',
                    default: 0,
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
exports.AddColumnVendorTable1718368710840 = AddColumnVendorTable1718368710840;
//# sourceMappingURL=1718368710840-AddColumnVendorTable.js.map