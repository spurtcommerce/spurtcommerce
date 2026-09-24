import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class VendorProductAdditionalFileTable1692960987178 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_vendor_product',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'vendor_product_additional_file',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'product_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                },
                {
                    name: 'file_name',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'container_name',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'modified_by',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'date',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'modified_date',
                    type: 'date',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('vendor_product_additional_file');
        if (!ifExsist) {
            await queryRunner.createTable(table);
            const getTable = await queryRunner.getTable('vendor_product_additional_file');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                await queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vendor_product_additional_file');
    }

}
