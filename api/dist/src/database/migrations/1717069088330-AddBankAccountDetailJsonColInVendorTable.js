"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBankAccountDetailJsonColInVendorTable1717069088330 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddBankAccountDetailJsonColInVendorTable1717069088330 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'bank_account');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'bank_account',
                    type: 'json',
                    isPrimary: false,
                    isNullable: true,
                }));
                yield (0, typeorm_1.getRepository)('Vendor').update({}, {
                    bankAccount: {
                        accountHolderName: '',
                        accountNumber: '',
                        branch: '',
                        ifsc: '',
                        bankName: '',
                        bic: '',
                        accountCreatedOn: '',
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
exports.AddBankAccountDetailJsonColInVendorTable1717069088330 = AddBankAccountDetailJsonColInVendorTable1717069088330;
//# sourceMappingURL=1717069088330-AddBankAccountDetailJsonColInVendorTable.js.map