import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsVendorSettingsForTheme1770726605465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vendor_settings
            ADD COLUMN default_palette VARCHAR(255) DEFAULT 'forest green',
            ADD COLUMN primary_color VARCHAR(255) DEFAULT '#FA518A',
            ADD COLUMN secondary_color VARCHAR(255) DEFAULT '#1D030C'
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
