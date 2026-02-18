"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTblQuotationProduct1712928203183 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTblQuotationProduct1712928203183 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Create the new table
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'quotation_product',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'quotation_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'product_name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'product_price',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'discount_amount',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'base_price',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'tax_type',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'tax_value',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'total',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'discounted_amount',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'quotation_status_id',
                        type: 'int',
                        isNullable: false,
                        default: 0,
                        comment: '0 -> IN-PROGRESS, 1 -> APPROVED',
                    },
                    {
                        name: 'best_quoted_price',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'reply_message',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'tax',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'sku_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'datetime',
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                        comment: 'LAST MODIFIED DATE',
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                    },
                ],
            }), true);
            yield queryRunner.createForeignKey('quotation_product', new typeorm_1.TableForeignKey({
                columnNames: ['quotation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'quotation',
                onDelete: 'CASCADE',
            }));
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('quotation_product', true);
        });
    }
}
exports.CreateTblQuotationProduct1712928203183 = CreateTblQuotationProduct1712928203183;
//# sourceMappingURL=1712928203183-CreateTblQuotationProduct.js.map