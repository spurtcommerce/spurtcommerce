import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateVendorInvoice1600785627733 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_vendor_tbl_vendor_invoice_foreignKey',
        columnNames: ['vendor_id'],
        referencedColumnNames: ['vendor_id'],
        referencedTableName: 'vendor',
        onDelete: 'CASCADE',
    });

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_order_tbl_vendor_invoice_foreignKey',
        columnNames: ['order_id'],
        referencedColumnNames: ['order_id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
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
                },  {
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
        const ifExsist = await queryRunner.hasTable('vendor_invoice');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }

        const ifDataExistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
        if (!ifDataExistt) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vendor_invoice', true);
    }

}
