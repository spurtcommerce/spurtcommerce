import { MigrationInterface, QueryRunner } from 'typeorm';

export class TruncateVendorSettingsDomainTable1761114894942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE vendor_settings_domain`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }
}
