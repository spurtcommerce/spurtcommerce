import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSpecificationTransaltion1761557687867 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing foreign key constraint
    await queryRunner.query(`
      ALTER TABLE \`specification_translation\`
      DROP FOREIGN KEY \`fk_specification_translation_language_language_id_idx\`;
    `);

    // Add the new foreign key constraint referencing vendor_language.id
    await queryRunner.query(`
      ALTER TABLE \`specification_translation\`
      ADD CONSTRAINT \`fk_specification_translation_language_language_id_idx\`
      FOREIGN KEY (\`language_id\`)
      REFERENCES \`vendor_language\`(\`id\`)
      ON DELETE CASCADE
      ON UPDATE RESTRICT;
    `);

    // Check if FK exists
    const existingFk = await queryRunner.query(`
    SELECT CONSTRAINT_NAME
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'attribute_translation'
      AND CONSTRAINT_NAME = 'fk_attribute_translation_vendor_language_language_id';
`);
    // update attribute transalation
    if (existingFk.length > 0) {
      await queryRunner.query(`
        ALTER TABLE attribute_translation
        DROP FOREIGN KEY fk_attribute_translation_vendor_language_language_id;
    `);
    }

    // Add the FK with ON DELETE CASCADE
    await queryRunner.query(`
    ALTER TABLE attribute_translation
    ADD CONSTRAINT fk_attribute_translation_vendor_language_language_id
    FOREIGN KEY (language_id) REFERENCES vendor_language(id)
    ON DELETE CASCADE;
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
