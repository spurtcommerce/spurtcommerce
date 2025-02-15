import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVendorTable1722491768166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasColumn('vendor', 'personalized_settings');
        if (exist) {
            await queryRunner.query(`
                UPDATE \`vendor\`
                SET \`personalized_settings\` = '{ "timeZone": "", "dateFormat": "", "timeFormat": "", "defaultLanguage": 0 }'
                WHERE \`personalized_settings\` IS NULL;
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
