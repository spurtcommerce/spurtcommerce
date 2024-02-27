"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuoteTable1590492340558 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateQuoteTable1590492340558 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_product_tbl_quotation_foreign',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_customer_tbl_quotation_foreign',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'quotation',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'product_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'customer_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'quantity',
                        type: 'integer',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'quantity_unit',
                        type: 'varchar',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_value',
                        type: 'varchar',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'comments',
                        type: 'text',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'purpose',
                        type: 'integer',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('quotation');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('quotation');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('quotation', true);
        });
    }
}
exports.CreateQuoteTable1590492340558 = CreateQuoteTable1590492340558;
//# sourceMappingURL=1590492340558-CreateQuoteTable.js.map