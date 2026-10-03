import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInSiteFilterSection1680166368791 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('site_filter_section', 'section_id');
        if (!ifExist) {
        await queryRunner.addColumn('site_filter_section', new TableColumn({
                name: 'section_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('site_filter_section', 'section_id');
    }

}
