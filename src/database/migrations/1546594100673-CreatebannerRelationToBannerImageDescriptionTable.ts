import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class CreatebannerRelationToBannerImageDescriptionTable1546594100673 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_Banner_BannerImageDescription',
        columnNames: ['banner_id'],
        referencedColumnNames: ['banner_id'],
        referencedTableName: 'banner',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('banner_image_description');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('banner_image_description');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
