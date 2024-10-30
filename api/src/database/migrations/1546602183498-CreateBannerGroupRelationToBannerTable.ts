import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class CreateBannerGroupRelationToBannerTable1546602183498 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_BannerGroup_Banner',
        columnNames: ['banner_group_id'],
        referencedColumnNames: ['banner_group_id'],
        referencedTableName: 'banner_group',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('banner');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_group_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('banner');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_group_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
