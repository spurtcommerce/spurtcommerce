import {MigrationInterface, QueryRunner, TableForeignKey, Table} from 'typeorm';

export class CreateProductSpecialTable1554980920462 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_product_special_product',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'product_special',
            columns: [
                {
                    name: 'product_special_id',
                    type: 'integer',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                },
                {
                    name: 'customer_group_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'priority',
                    type: 'integer',
                    length: '5',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'price',
                    type: 'DECIMAL(15,4)',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'date_start',
                    type: 'DATE',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'date_end',
                    type: 'DATE',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
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
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('product_special');
        if (!ifExsist) {
        await queryRunner.createTable(table);
        const getTable = await queryRunner.getTable('product_special');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey);
        }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('product_special');
        const getTable = await queryRunner.getTable('product_special');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(getTable, this.tableForeignKey);
        }
    }
}
