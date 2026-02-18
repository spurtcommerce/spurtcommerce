"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTblQuotation1712926457994 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTblQuotation1712926457994 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Create the new table
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'quotation',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'telephone',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'business_name',
                        type: 'varchar(255)',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'postal_code',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'city',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'state',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'state_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'country',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'country_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'quotation_no',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'currency_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'total',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'ip',
                        type: 'varchar',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'comment',
                        type: 'varchar',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'quotation_status_id',
                        type: 'int',
                        isPrimary: false,
                        default: 0,
                        comment: '0 -> IN-PROGRESS, 1 -> APPROVED',
                    },
                    {
                        name: 'responded_date',
                        type: 'timestamp',
                        isNullable: true,
                        comment: 'SELLER RESPONDED DATE',
                    },
                    {
                        name: 'created_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                        comment: 'CREATED SYSTEM DATE',
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                        comment: 'CREATED USER ID',
                    },
                    {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                        comment: 'LAST MODIFIED DATE',
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                        comment: 'MODIFIED USER ID',
                    },
                ],
            }), true);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Drop the table if the migration is rolled back
            yield queryRunner.dropTable('quotation', true);
        });
    }
}
exports.CreateTblQuotation1712926457994 = CreateTblQuotation1712926457994;
//# sourceMappingURL=1712926457994-CreateTblQuotation.js.map