import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AlterColumnInPageGroup1606204705980 implements MigrationInterface {
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_page_page_group1',
        columnNames: ['page_group_id'],
        referencedColumnNames: ['group_id'],
        referencedTableName: 'page_group',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('page');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey1);
        }
        await queryRunner.dropTable('page_group', true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `page_group` RENAME COLUMN `title` TO `group_name`');
        await queryRunner.query('ALTER TABLE `page_group` RENAME COLUMN `page_group_id` TO `group_id`');
    }

}
