import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableVendorSettingsAddColumsForSub1759907407266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vendor_settings
            ADD COLUMN product_create_count INT DEFAULT 0,
            ADD COLUMN feature_access JSON;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
