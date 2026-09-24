import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumSiteNameForVendorSettingsTable1740744172946 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor_settings', new TableColumn(
            {
                name: 'site_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
