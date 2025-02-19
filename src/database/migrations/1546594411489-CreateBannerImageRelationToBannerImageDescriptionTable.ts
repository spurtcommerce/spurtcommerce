import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class CreateBannerImageRelationToBannerImageDescriptionTable1546594411489 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_BannerImage_BannerImageDescription',
        columnNames: ['banner_image_id'],
        referencedColumnNames: ['banner_image_id'],
        referencedTableName: 'banner_image',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('banner_image_description');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_image_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('banner_image_description');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_image_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
