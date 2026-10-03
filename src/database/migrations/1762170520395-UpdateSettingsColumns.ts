import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSettingsColumns1762170520395 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('settings');
        if (tableExists) {
            await queryRunner.query(`
            UPDATE settings
            SET email_logo = 'logo.jpg',
            email_logo_path = 'storesLogo/';
      `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }
}
