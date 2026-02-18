"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVendorTable1717148588331 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVendorTable1717148588331 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'mail_otp');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'mail_otp',
                    type: 'int',
                    length: '11',
                    comment: 'VENDOR MAIL OTP',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist2 = yield queryRunner.hasColumn('vendor', 'login_otp_expire_time');
            if (!columnExist2) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'login_otp_expire_time',
                    type: 'datetime',
                    comment: 'VENDOR MAIL OTP EXPIRE TIME',
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
exports.AddColumnVendorTable1717148588331 = AddColumnVendorTable1717148588331;
//# sourceMappingURL=1717148588331-AddColumnVendorTable.js.map