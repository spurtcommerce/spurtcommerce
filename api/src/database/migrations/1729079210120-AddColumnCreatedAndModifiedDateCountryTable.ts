import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCreatedAndModifiedDateCountryTable1729079210120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnCreatedDateExist = await queryRunner.hasColumn('country', 'created_date');

        if (!columnCreatedDateExist) {
            await queryRunner.addColumn('country', new TableColumn(
                {
                    name: 'created_date',
                    type: 'timestamp',
                    isNullable: true,
                }
            ));
        }

        const columnModifiedDateExist = await queryRunner.hasColumn('country', 'modified_date');

        if (!columnModifiedDateExist) {
            await queryRunner.addColumn('country', new TableColumn(
                {
                    name: 'modified_date',
                    type: 'timestamp',
                    isNullable: true,
                }
            ));
        }

        const columnCreatedByExist = await queryRunner.hasColumn('country', 'created_by');

        if (!columnCreatedByExist) {
            await queryRunner.addColumn('country', new TableColumn(
                {
                    name: 'created_by',
                    type: 'int',
                    isNullable: true,
                }
            ));
        }

        const columnModifiedByExist = await queryRunner.hasColumn('country', 'modified_by');

        if (!columnModifiedByExist) {
            await queryRunner.addColumn('country', new TableColumn(
                {
                    name: 'modified_by',
                    type: 'int',
                    isNullable: true,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
