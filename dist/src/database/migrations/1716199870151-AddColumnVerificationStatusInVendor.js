"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVerificationStatusInVendor1716199870151 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVerificationStatusInVendor1716199870151 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist1 = yield queryRunner.hasColumn('vendor', 'verification');
            if (!columnExist1) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'verification',
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
exports.AddColumnVerificationStatusInVendor1716199870151 = AddColumnVerificationStatusInVendor1716199870151;
//# sourceMappingURL=1716199870151-AddColumnVerificationStatusInVendor.js.map