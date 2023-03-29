import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnShowHomePageWidget1679295983234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasColumn = await queryRunner.hasColumn('widget', 'show_home_page_widget');
        if (!hasColumn) {
            await queryRunner.addColumn('widget', new TableColumn({
                name: 'show_home_page_widget',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
