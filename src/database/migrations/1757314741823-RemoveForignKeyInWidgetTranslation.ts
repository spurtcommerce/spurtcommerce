import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveForignKeyInWidgetTranslation1757314741823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('widget_translation');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.query(`ALTER TABLE widget_translation DROP FOREIGN KEY fk_widget_widget_language_language_id`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
