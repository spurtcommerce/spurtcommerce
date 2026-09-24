import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSellerSettingForUserFive1740547005447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                INSERT INTO vendor_settings (vendor_id)
                SELECT 5
                WHERE EXISTS (
                    SELECT 1 FROM vendor WHERE vendor_id = 5
                ) AND NOT EXISTS (
                    SELECT 1 FROM vendor_settings WHERE vendor_id = 5
                )
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
