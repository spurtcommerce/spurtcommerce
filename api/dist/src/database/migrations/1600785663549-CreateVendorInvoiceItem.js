"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorInvoiceItem1600785663549 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorInvoiceItem1600785663549 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_invoice_tbl_vendor_invoice_item_foreignKey',
            columnNames: ['vendor_invoice_id'],
            referencedColumnNames: ['vendor_invoice_id'],
            referencedTableName: 'vendor_invoice',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey2 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_order_product_tbl_vendor_invoice_item_foreignKey',
            columnNames: ['vendor_invoice_id'],
            referencedColumnNames: ['vendor_invoice_id'],
            referencedTableName: 'vendor_invoice',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_invoice_item',
                columns: [
                    {
                        name: 'vendor_invoice_item_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'vendor_invoice_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'order_product_id',
                        type: 'integer',
                        length: '11',
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
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('vendor_invoice_item');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_invoice_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
            const ifDataExistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
            if (!ifDataExistt) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey2);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('vendor_invoice_item', true);
        });
    }
}
exports.CreateVendorInvoiceItem1600785663549 = CreateVendorInvoiceItem1600785663549;
//# sourceMappingURL=1600785663549-CreateVendorInvoiceItem.js.map