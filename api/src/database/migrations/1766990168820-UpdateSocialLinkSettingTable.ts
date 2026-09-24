import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSocialLinkSettingTable1766990168820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE settings
            SET
                facebook  = 'https://www.facebook.com/spurtcommerce/'
            WHERE settings_id = 2
            `);
        await queryRunner.query(`
            UPDATE settings
            SET
                linkedin  = 'https://www.linkedin.com/company/spurtcommerce/'
            WHERE settings_id = 2
            `);
        await queryRunner.query(`
            UPDATE settings
            SET
                twitter  = 'https://x.com/Spurtcommerce'
            WHERE settings_id = 2
            `);
        await queryRunner.query(`
            UPDATE settings
            SET
                youtube = 'https://www.youtube.com/channel/UCfq0-RDusnkNE9mjY-s2AmA '
            WHERE settings_id = 2
            `);
        await queryRunner.query(`
            UPDATE settings
            SET
                instagram = 'https://www.instagram.com/spurtcommerce/'
            WHERE settings_id = 2
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
