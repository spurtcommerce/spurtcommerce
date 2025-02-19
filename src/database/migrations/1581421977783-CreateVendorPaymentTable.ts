import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateVendorPaymentTable1581421977783 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
                name: 'fk_tbl_vendorPayment_tbl_vendor_foreignKey',
                columnNames: ['vendor_id'],
                referencedColumnNames: ['vendor_id'],
                referencedTableName: 'vendor',
                onDelete: 'CASCADE',
    });

    private tableForeignKeyy = new TableForeignKey({
                name: 'fk_tbl_vendorPayment_tbl_vendorOrders_foreignKey',
                columnNames: ['vendor_order_id'],
                referencedColumnNames: ['vendor_order_id'],
                referencedTableName: 'vendor_orders',
                onDelete: 'CASCADE',
    });

    private tableForeignKeyyy = new TableForeignKey({
                name: 'fk_tbl_vendorPayment_tbl_paymentItems_foreignKey',
                columnNames: ['payment_item_id'],
                referencedColumnNames: ['payment_item_id'],
                referencedTableName: 'payment_items',
                onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
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
        const ifExsist = await queryRunner.hasTable('vendor_payment');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
        const ifDataExsistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_order_id') !== -1);
        if (!ifDataExsistt) {
            await queryRunner.createForeignKey(table, this.tableForeignKeyy);
        }
        const ifDataExsisttt = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
        if (!ifDataExsisttt) {
            await queryRunner.createForeignKey(table, this.tableForeignKeyyy);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('vendor_payment', true);
    }

}
