import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveForignKeyInPageGroupTranslation1757150344880 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('page_group_translation');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.query(`ALTER TABLE page_group_translation DROP FOREIGN KEY fk_page_group_translation_language_language_id_idx`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
