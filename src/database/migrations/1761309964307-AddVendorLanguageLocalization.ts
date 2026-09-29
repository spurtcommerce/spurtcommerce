import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVendorLanguageLocalization1761309964307 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if FK exists
        const existingCategoryFk = await queryRunner.query(`
    SELECT CONSTRAINT_NAME
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'category_translation'
      AND CONSTRAINT_NAME = 'fk_category_translation_vendor_language_language_id';
`);

        if (existingCategoryFk.length > 0) {
            await queryRunner.query(`
        ALTER TABLE category_translation
        DROP FOREIGN KEY fk_category_translation_vendor_language_language_id;
    `);
        }

        // Add the FK with ON DELETE CASCADE
        await queryRunner.query(`
    ALTER TABLE category_translation
    ADD CONSTRAINT fk_category_translation_vendor_language_language_id
    FOREIGN KEY (language_id) REFERENCES vendor_language(id)
    ON DELETE CASCADE;
`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }
}
