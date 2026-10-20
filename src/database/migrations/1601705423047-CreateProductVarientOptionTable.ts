import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductVarientOptionTable1601705423047 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_product_Related_tbl_product_varient_option',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_sku_Related_tbl_product_varient_option',
        columnNames: ['sku_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sku',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'product_varient_option',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'varient_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'product_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'sku_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
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
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'created_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('product_varient_option');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const getTable = await queryRunner.getTable('product_varient_option');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
        const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_varient_option', true);
    }

}
