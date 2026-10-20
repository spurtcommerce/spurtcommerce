import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVarientTransalation1761563116372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`variant_translation\`
            DROP FOREIGN KEY \`fk_variant_translation_language_language_id\`;
        `);

        // Add new foreign key referencing vendor_language
        await queryRunner.query(`
            ALTER TABLE \`variant_translation\`
            ADD CONSTRAINT \`fk_variant_translation_language_language_id\`
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
