import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductTransalation1761561885036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`product_translation\`
            DROP FOREIGN KEY \`fk_product_translation_vendor_language_language_id\`;
        `);

        await queryRunner.query(`
            ALTER TABLE \`product_translation\`
            ADD CONSTRAINT \`fk_product_translation_vendor_language_language_id\`
            FOREIGN KEY (\`language_id\`)
            REFERENCES \`vendor_language\`(\`id\`)
            ON DELETE CASCADE
            ON UPDATE RESTRICT;
        `);

        // --- PAGE TRANSLATION ---
        await queryRunner.query(`
            ALTER TABLE \`page_translation\`
            DROP FOREIGN KEY \`fk_page_translation_language_language_id_idx\`;
        `);

        await queryRunner.query(`
            ALTER TABLE \`page_translation\`
            ADD CONSTRAINT \`fk_page_translation_language_language_id_idx\`
            FOREIGN KEY (\`language_id\`)
            REFERENCES \`vendor_language\`(\`id\`)
            ON DELETE CASCADE
            ON UPDATE RESTRICT;
        `);

        // --- PAGE GROUP TRANSLATION ---
        await queryRunner.query(`
            ALTER TABLE \`page_group_translation\`
            ADD CONSTRAINT \`fk_page_group_translation_vendor_language_language_id\`
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
