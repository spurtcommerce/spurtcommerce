import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeForeignKeyProductTranslation1758196071107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE product_translation DROP FOREIGN KEY fk_product_translation_language_language_id;`);

        await queryRunner.query(`ALTER TABLE product_translation
            ADD CONSTRAINT fk_product_translation_vendor_language_language_id
            FOREIGN KEY (language_id) REFERENCES vendor_language(id);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
