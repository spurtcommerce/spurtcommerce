"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnKycVendor1728880841502 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnKycVendor1728880841502 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor');
            const kycStatusColumn = table === null || table === void 0 ? void 0 : table.findColumnByName('kyc_status');
            // Step 1: Add the column as nullable if it doesn't exist
            if (!kycStatusColumn) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'kyc_status',
                    type: 'enum',
                    enum: ['verified', 'rejected', 'submitted', 'in-review', 'pending'],
                    default: `'pending'`,
                    isNullable: true, // Initially make it nullable
                }));
            }
            // Step 2: Update all existing rows to have 'pending' as the value for 'kyc_status'
            yield queryRunner.query(`UPDATE vendor SET kyc_status = 'pending' WHERE kyc_status IS NULL`);
            // Step 3: Alter the column to be non-nullable
            yield queryRunner.changeColumn('vendor', 'kyc_status', new typeorm_1.TableColumn({
                name: 'kyc_status',
                type: 'enum',
                enum: ['verified', 'rejected', 'submitted', 'in-review', 'pending'],
                default: `'pending'`,
                isNullable: false, // Now make it non-nullable
            }));
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('vendor');
            const kycStatusColumn = table === null || table === void 0 ? void 0 : table.findColumnByName('kyc_status');
            // Drop the 'kyc_status' column if it exists
            if (kycStatusColumn) {
                yield queryRunner.dropColumn('vendor', 'kyc_status');
            }
        });
    }
}
exports.AddColumnKycVendor1728880841502 = AddColumnKycVendor1728880841502;
//# sourceMappingURL=1728880841502-AddColumnKycVendor.js.map