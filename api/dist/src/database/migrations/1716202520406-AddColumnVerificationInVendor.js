"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVerificationInVendor1716202520406 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVerificationInVendor1716202520406 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist2 = yield queryRunner.hasColumn('vendor', 'verification_comment');
            if (!columnExist2) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'verification_comment',
                    type: 'json',
                    isPrimary: false,
                    isNullable: false,
                }));
            }
            const columnExist3 = yield queryRunner.hasColumn('vendor', 'verification_detail_comment');
            if (!columnExist3) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'verification_detail_comment',
                    type: 'json',
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
exports.AddColumnVerificationInVendor1716202520406 = AddColumnVerificationInVendor1716202520406;
//# sourceMappingURL=1716202520406-AddColumnVerificationInVendor.js.map