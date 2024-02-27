"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorInvoice1600785627733 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorInvoice1600785627733 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_tbl_vendor_invoice_foreignKey',
            columnNames: ['vendor_id'],
            referencedColumnNames: ['vendor_id'],
            referencedTableName: 'vendor',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_order_tbl_vendor_invoice_foreignKey',
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_invoice',
                columns: [
                    {
                        name: 'vendor_invoice_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'vendor_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'invoice_no',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'invoice_prefix',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'total',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_firstname',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_lastname',
                        type: 'varchar',
                        length: '32',
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
            const ifExsist = yield queryRunner.hasTable('vendor_invoice');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (!ifDataExistt) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('vendor_invoice', true);
        });
    }
}
exports.CreateVendorInvoice1600785627733 = CreateVendorInvoice1600785627733;
//# sourceMappingURL=1600785627733-CreateVendorInvoice.js.map