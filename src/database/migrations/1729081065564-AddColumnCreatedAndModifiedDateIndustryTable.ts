import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCreatedAndModifiedDateIndustryTable1729081065564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnCreatedDateExist = await queryRunner.hasColumn('industry', 'created_date');

        if (!columnCreatedDateExist) {
            await queryRunner.addColumn('industry', new TableColumn(
                {
                    name: 'created_date',
                    type: 'timestamp',
                    isNullable: true,
                }
            ));
        }

        const columnModifiedDateExist = await queryRunner.hasColumn('industry', 'modified_date');

        if (!columnModifiedDateExist) {
            await queryRunner.addColumn('industry', new TableColumn(
                {
                    name: 'modified_date',
                    type: 'timestamp',
                    isNullable: true,
                }
            ));
        }

        const columnCreatedByExist = await queryRunner.hasColumn('industry', 'created_by');

        if (!columnCreatedByExist) {
            await queryRunner.addColumn('industry', new TableColumn(
                {
                    name: 'created_by',
                    type: 'int',
                    isNullable: true,
                }
            ));
        }

        const columnModifiedByExist = await queryRunner.hasColumn('industry', 'modified_by');

        if (!columnModifiedByExist) {
            await queryRunner.addColumn('industry', new TableColumn(
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
