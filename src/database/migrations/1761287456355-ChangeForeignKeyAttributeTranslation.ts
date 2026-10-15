import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeForeignKeyAttributeTranslation1761287456355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE attribute_translation DROP FOREIGN KEY fk_attribute_translation_language_language_id;`);

        await queryRunner.query(`ALTER TABLE attribute_translation
            ADD CONSTRAINT fk_attribute_translation_vendor_language_language_id
            FOREIGN KEY (language_id) REFERENCES vendor_language(id);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
