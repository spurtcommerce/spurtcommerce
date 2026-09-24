import { MigrationInterface, QueryRunner } from 'typeorm';

export class DafaultThemeId1772877040321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE vendor_settings
            SET theme_id = 1
            WHERE theme_id IS NULL
        `);

        await queryRunner.query(`
            ALTER TABLE vendor_settings
            ALTER COLUMN theme_id SET DEFAULT 1
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
