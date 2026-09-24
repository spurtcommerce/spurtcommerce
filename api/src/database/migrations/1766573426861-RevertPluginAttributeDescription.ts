import { MigrationInterface, QueryRunner } from 'typeorm';

export class RevertPluginAttributeDescription1766573426861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE plugins
            SET
                description  = 'Manage product attributes such as color and size.'
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
