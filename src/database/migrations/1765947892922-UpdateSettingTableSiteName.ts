import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSettingTableSiteName1765947892922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('settings');
        if (tableExists) {
            await queryRunner.query(`update settings set site_name = 'SpurtB2B'`);
        }
        // do for in email to show spurtb2b instead of SpurtCart
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
