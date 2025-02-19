import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddPageRelationToPageGroupTable1546585572765 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_page_page_group1',
        columnNames: ['page_group_id'],
        referencedColumnNames: ['page_group_id'],
        referencedTableName: 'page_group',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('page');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('page');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
