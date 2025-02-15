import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateVendorInvoiceItem1600785663549 implements MigrationInterface {
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_vendor_invoice_tbl_vendor_invoice_item_foreignKey',
        columnNames: ['vendor_invoice_id'],
        referencedColumnNames: ['vendor_invoice_id'],
        referencedTableName: 'vendor_invoice',
        onDelete: 'CASCADE',
    });
    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_tbl_order_product_tbl_vendor_invoice_item_foreignKey',
        columnNames: ['vendor_invoice_id'],
        referencedColumnNames: ['vendor_invoice_id'],
        referencedTableName: 'vendor_invoice',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
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
        const ifExsist = await queryRunner.hasTable('vendor_invoice_item');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_invoice_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }

        const ifDataExistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
        if (!ifDataExistt) {
            await queryRunner.createForeignKey(table, this.tableForeignKey2);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vendor_invoice_item', true);
    }

}
