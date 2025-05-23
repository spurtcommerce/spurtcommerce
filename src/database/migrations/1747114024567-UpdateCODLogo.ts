import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCODLogo1747114024567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE plugins
            SET plugin_avatar = 'cod payment_1747113838765.png'
            WHERE slug_name = 'cash-on-delivery';`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
