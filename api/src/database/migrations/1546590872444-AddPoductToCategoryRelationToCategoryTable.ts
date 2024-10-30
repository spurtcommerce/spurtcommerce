import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddPoductToCategoryRelationToCategoryTable1546590872444 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_product_to_category_category1',
        columnNames: ['category_id'],
        referencedColumnNames: ['category_id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('product_to_category');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('product_to_category');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
