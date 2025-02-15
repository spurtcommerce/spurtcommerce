import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnShowHomePageWidgetInWidgetTable1674815408760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('widget', 'show_home_page_widget');
        if (!ifExist) {
        await queryRunner.addColumn('widget', new TableColumn({
                name: 'show_home_page_widget',
                type: 'integer',
                default: 0,
                isPrimary: false,
                isNullable: true,
        }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
