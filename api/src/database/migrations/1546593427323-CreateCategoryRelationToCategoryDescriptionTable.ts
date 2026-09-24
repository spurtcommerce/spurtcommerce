import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class CreateCategoryRelationToCategoryDescriptionTable1546593427323 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_Category_CategoryDescription',
        columnNames: ['category_id'],
        referencedColumnNames: ['category_id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('category_description');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('category_description');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
