import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnOFBaseModel1781768460463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('search_suggestions', [
            new TableColumn({
                name: 'created_by',
                type: 'int',
                isNullable: true,
            }),

            new TableColumn({
                name: 'modified_by',
                type: 'int',
                isNullable: true,
            }),

        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('search_suggestions', 'created_by');
        await queryRunner.dropColumn('search_suggestions', 'modified_by');
    }

}
