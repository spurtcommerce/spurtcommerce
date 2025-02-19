import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateCategoryCommissionTable1571749863667 implements MigrationInterface {
    private CategoryCommissionToCategoryForeignKeys = new TableForeignKey({
        name: 'fk_tbl_category_commission_tbl_category_foreignKey',
        columnNames: ['category_id'],
        referencedColumnNames: ['category_id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'category_commission',
            columns: [
                {
                    name: 'category_commission_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'category_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'category_commission_value',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('category_commission');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.CategoryCommissionToCategoryForeignKeys);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('category_commission', true);
    }

}
