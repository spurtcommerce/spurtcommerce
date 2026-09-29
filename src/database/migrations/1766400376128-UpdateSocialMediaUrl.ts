import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSocialMediaUrl1766400376128 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE settings
            SET
                facebook  = 'https://www.facebook.com/piccosoft'
            WHERE settings_id = 2
            `);
        await queryRunner.query(`
            UPDATE settings
            SET
                linkedin  = 'https://www.linkedin.com/company/piccosoft/'
            WHERE settings_id = 2
            `);
        await queryRunner.query(`
            UPDATE settings
            SET
                twitter  = 'https://x.com/piccosoft'
            WHERE settings_id = 2
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
