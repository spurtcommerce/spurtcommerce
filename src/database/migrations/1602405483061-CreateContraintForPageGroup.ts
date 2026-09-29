import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class CreateContraintForPageGroup1602405483061 implements MigrationInterface {

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_page_related_tbl_page_group_foreignKey',
        columnNames: ['page_group_id'],
        referencedColumnNames: ['group_id'],
        referencedTableName: 'page_group',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('page');
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('page');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

}
