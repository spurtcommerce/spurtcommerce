import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropColumnInVendorSetting1770706011001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vendor_settings
            DROP COLUMN default_palette,
            DROP COLUMN primary_color,
            DROP COLUMN secondary_color
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
