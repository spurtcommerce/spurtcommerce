"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnCustoerTable1716375063741 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnCustoerTable1716375063741 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('customer', 'mail_otp');
            if (!columnExist) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'mail_otp',
                    type: 'int',
                    length: '11',
                    comment: 'BUYER MAIL CHANGE OTP',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist2 = yield queryRunner.hasColumn('customer', 'mail_otp_expire_time');
            if (!columnExist2) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'mail_otp_expire_time',
                    type: 'datetime',
                    comment: 'BUYER MAIL CHANGE OTP EXPIRE TIME',
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
exports.AddColumnCustoerTable1716375063741 = AddColumnCustoerTable1716375063741;
//# sourceMappingURL=1716375063741-AddColumnCustoerTable.js.map