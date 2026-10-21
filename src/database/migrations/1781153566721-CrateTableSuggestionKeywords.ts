import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CrateTableSuggestionKeywords1781153566721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'search_suggestions',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'suggestions',
                        type: 'varchar(100)',
                        isNullable: false,
                    },
                    {
                        name: 'category_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'count',
                        type: 'int',
                        default: 0,
                    },
                    {
                        name: 'status',
                        type: 'boolean',
                        default: 0,
                    },
                    {
                        name: 'created_date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            'search_suggestions',
            new TableForeignKey({
                columnNames: ['category_id'],
                referencedTableName: 'category',
                referencedColumnNames: ['category_id'], // or 'id'
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable('search_suggestions');

        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.includes('category_id')
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey('search_suggestions', foreignKey);
        }

        await queryRunner.dropTable('search_suggestions');
    }
}
