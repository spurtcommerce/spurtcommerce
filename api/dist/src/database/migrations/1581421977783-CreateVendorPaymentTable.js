"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorPaymentTable1581421977783 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorPaymentTable1581421977783 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendorPayment_tbl_vendor_foreignKey',
            columnNames: ['vendor_id'],
            referencedColumnNames: ['vendor_id'],
            referencedTableName: 'vendor',
            onDelete: 'CASCADE',
        });
        this.tableForeignKeyy = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendorPayment_tbl_vendorOrders_foreignKey',
            columnNames: ['vendor_order_id'],
            referencedColumnNames: ['vendor_order_id'],
            referencedTableName: 'vendor_orders',
            onDelete: 'CASCADE',
        });
        this.tableForeignKeyyy = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendorPayment_tbl_paymentItems_foreignKey',
            columnNames: ['payment_item_id'],
            referencedColumnNames: ['payment_item_id'],
            referencedTableName: 'payment_items',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_payment',
                columns: [
                    {
                        name: 'vendor_payment_id',
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
                        isNullable: true,
                    }, {
                        name: 'vendor_order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_item_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'amount',
                        type: 'DECIMAL',
                        length: '10,2',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'commission_amount',
                        type: 'DECIMAL',
                        length: '10,2',
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
            const ifExsist = yield queryRunner.hasTable('vendor_payment');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExsistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_order_id') !== -1);
            if (!ifDataExsistt) {
                yield queryRunner.createForeignKey(table, this.tableForeignKeyy);
            }
            const ifDataExsisttt = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
            if (!ifDataExsisttt) {
                yield queryRunner.createForeignKey(table, this.tableForeignKeyyy);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('vendor_payment', true);
        });
    }
}
exports.CreateVendorPaymentTable1581421977783 = CreateVendorPaymentTable1581421977783;
//# sourceMappingURL=1581421977783-CreateVendorPaymentTable.js.map