import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddIndustryIdInFamilyTable1787000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const hasColumn = await queryRunner.hasColumn(
            'family',
            'industry_id'
        );

        if (!hasColumn) {
            await queryRunner.addColumn(
                'family',
                new TableColumn({
                    name: 'industry_id',
                    type: 'int',
                    isNullable: true,
                })
            );
        }

        const table = await queryRunner.getTable('family');

        const foreignKeyExists = table?.foreignKeys.some(
            (foreignKey) =>
                foreignKey.columnNames.includes('industry_id')
        );

        if (!foreignKeyExists) {
            await queryRunner.createForeignKey(
                'family',
                new TableForeignKey({
                    name: 'FK_family_industry',
                    columnNames: ['industry_id'],
                    referencedTableName: 'industry',
                    referencedColumnNames: ['id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
