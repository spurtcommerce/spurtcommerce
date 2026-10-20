import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductVarientOptionDetailTable1601705435996 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_var_val_Related_tbl_prdt_var_opt_dtl',
        columnNames: ['varients_value_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'variant_value',
        onDelete: 'CASCADE',
    });
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_prdt_var_opt_Related_tbl_prdt_var_opt_det',
        columnNames: ['product_varient_option_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_varient_option',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'product_varient_option_details',
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
                    name: 'varients_value_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'product_variant_id',
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
        const ifExsist = await queryRunner.hasTable('product_varient_option_details');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const getTable = await queryRunner.getTable('product_varient_option_details');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('varients_value_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
        const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_varient_option_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_varient_option_details', true);
    }

}
