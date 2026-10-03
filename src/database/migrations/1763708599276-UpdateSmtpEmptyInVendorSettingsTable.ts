import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSmtpEmptyInVendorSettingsTable1763708599276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE vendor_settings
            SET
                mail_driver = NULL,
                mail_host = NULL,
                mail_username = NULL,
                mail_password = NULL,
                mail_port = NULL,
                mail_secure = NULL,
                mail_encryption = NULL,
                mail_from = NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
