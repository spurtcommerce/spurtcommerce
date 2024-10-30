import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateVendorOrderArchiveTable1579519310557 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_vendor_tbl_vendor_order_archive_foreignKey',
        columnNames: ['vendor_id'],
        referencedColumnNames: ['vendor_id'],
        referencedTableName: 'vendor',
        onDelete: 'CASCADE',
    });

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_order_tbl_vendor_order_archive_foreignKey',
        columnNames: ['order_id'],
        referencedColumnNames: ['order_id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_tbl_vendor_order_status_tbl_vendor_order_archive_foreignKey',
        columnNames: ['sub_order_status_id'],
        referencedColumnNames: ['vendor_order_status_id'],
        referencedTableName: 'vendor_order_status',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'vendor_order_archive',
            columns: [
                {
                    name: 'vendor_order_archive_id',
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
                    name: 'sub_order_id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'sub_order_status_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'total',
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
        const ifExsist = await queryRunner.hasTable('vendor_order_archive');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }

        const ifDataExist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
        if (!ifDataExist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }

        const ifDataExistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('sub_order_status_id') !== -1);
        if (!ifDataExistt) {
            await queryRunner.createForeignKey(table, this.tableForeignKey2);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('vendor_order_archive', true);
    }
}
