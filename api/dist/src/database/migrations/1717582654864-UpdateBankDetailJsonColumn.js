"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBankDetailJsonColumn1717582654864 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class UpdateBankDetailJsonColumn1717582654864 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'bank_account');
            if (columnExist) {
                yield (0, typeorm_1.getRepository)('Vendor').update({}, {
                    bankAccount: {
                        accountHolderName: '',
                        accountNumber: '',
                        branch: '',
                        ifsc: '',
                        bankName: '',
                        bic: '',
                        accountCreatedOn: '',
                        bankAddress1: '',
                        bankAddress2: '',
                        bankArea: '',
                        bankCity: '',
                        bankCountryId: '',
                        bankStateId: '',
                        bankPincode: '',
                    },
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
exports.UpdateBankDetailJsonColumn1717582654864 = UpdateBankDetailJsonColumn1717582654864;
//# sourceMappingURL=1717582654864-UpdateBankDetailJsonColumn.js.map