"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerDeleteAccount1753876289560 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCustomerDeleteAccount1753876289560 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'customer_delete_account',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'customer_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'otp',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'verify_otp_flag',
                        type: 'int',
                        default: 0,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['approved', 'pending'],
                        default: `'pending'`,
                    },
                    {
                        name: 'reason',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'mail_otp_expire_time',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            }));
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateCustomerDeleteAccount1753876289560 = CreateCustomerDeleteAccount1753876289560;
//# sourceMappingURL=1753876289560-CreateCustomerDeleteAccount.js.map