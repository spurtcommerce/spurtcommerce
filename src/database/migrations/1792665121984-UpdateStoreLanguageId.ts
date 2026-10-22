import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStoreLanguageId1792665121984 implements MigrationInterface {

       public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE vendor_settings
            SET store_language_id = 1
            WHERE vendor_id = 1;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE vendor_settings
            SET store_language_id = 847
            WHERE vendor_id = 1;
        `);
    }
}
