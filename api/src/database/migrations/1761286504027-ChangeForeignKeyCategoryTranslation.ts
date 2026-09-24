import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeForeignKeyCategoryTranslation1761286504027 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE category_translation DROP FOREIGN KEY fk_category_translation_language_language_id_idx;`);

        await queryRunner.query(`ALTER TABLE category_translation
            ADD CONSTRAINT fk_category_translation_vendor_language_language_id
            FOREIGN KEY (language_id) REFERENCES vendor_language(id);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
