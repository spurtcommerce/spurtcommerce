import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnInVendorSettingTable1763187280984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vendor_settings
            ADD COLUMN customer_service_hours VARCHAR(255) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
