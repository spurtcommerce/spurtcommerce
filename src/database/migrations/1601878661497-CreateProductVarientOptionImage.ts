import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductVarientOptionImage1601878661497 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_prdt_var_opt_related_tbl_prdt_var_opt_img',
        columnNames: ['product_varient_option_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_varient_option',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'product_varient_option_image',
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
                    name: 'product_varient_option_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'image',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'container_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'default_image',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
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
        const ifExsist = await queryRunner.hasTable('product_varient_option_image');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const getTable = await queryRunner.getTable('product_varient_option_image');
        const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_varient_option_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_varient_option_image', true);
    }
}
