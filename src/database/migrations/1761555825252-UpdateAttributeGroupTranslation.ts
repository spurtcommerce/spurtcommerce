import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAttributeGroupTranslation1761555825252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop existing foreign key
        await queryRunner.query(`
      ALTER TABLE \`attribute_group_translation\`
      DROP FOREIGN KEY \`fk_attribute_group_translation_language_language_id\`;
    `);

        // Add new foreign key referencing vendor_language.id
        await queryRunner.query(`
      ALTER TABLE \`attribute_group_translation\`
      ADD CONSTRAINT \`fk_attribute_group_translation_language_language_id\`
      FOREIGN KEY (\`language_id\`)
      REFERENCES \`vendor_language\`(\`id\`)
      ON DELETE CASCADE
      ON UPDATE RESTRICT;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }

}
