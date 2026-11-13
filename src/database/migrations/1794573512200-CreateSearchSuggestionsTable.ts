import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateSearchSuggestionsTable1794573512200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('search_suggestions');

        if (!tableExists) {
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
                            name: 'category_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'suggestions',
                            type: 'text',
                            isNullable: true,
                        },
                        {
                            name: 'count',
                            type: 'int',
                            default: 0,
                        },
                        {
                            name: 'status',
                            type: 'int',
                            default: 1,
                        },
                        {
                            name: 'created_by',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'created_date',
                            type: 'datetime',
                            default: 'CURRENT_TIMESTAMP',
                        },
                        {
                            name: 'modified_by',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'modified_date',
                            type: 'datetime',
                            default: 'CURRENT_TIMESTAMP',
                            onUpdate: 'CURRENT_TIMESTAMP',
                        },
                        {
                            name: 'is_active',
                            type: 'int',
                            default: 1,
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
                    referencedColumnNames: ['category_id'],
                    onDelete: 'CASCADE',
                })
            );
        } else {
            // Table already exists; verify and add missing columns
            const hasIsActive = await queryRunner.hasColumn('search_suggestions', 'is_active');
            if (!hasIsActive) {
                await queryRunner.addColumn(
                    'search_suggestions',
                    new TableColumn({
                        name: 'is_active',
                        type: 'int',
                        default: 1,
                    })
                );
            }

            const hasCreatedBy = await queryRunner.hasColumn('search_suggestions', 'created_by');
            if (!hasCreatedBy) {
                await queryRunner.addColumn(
                    'search_suggestions',
                    new TableColumn({
                        name: 'created_by',
                        type: 'int',
                        isNullable: true,
                    })
                );
            }

            const hasModifiedBy = await queryRunner.hasColumn('search_suggestions', 'modified_by');
            if (!hasModifiedBy) {
                await queryRunner.addColumn(
                    'search_suggestions',
                    new TableColumn({
                        name: 'modified_by',
                        type: 'int',
                        isNullable: true,
                    })
                );
            }

            await queryRunner.query(`
                ALTER TABLE search_suggestions
                MODIFY COLUMN suggestions TEXT NULL,
                MODIFY COLUMN status INT DEFAULT 1
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('search_suggestions');
        if (table) {
            const foreignKey = table.foreignKeys.find(
                (fk) => fk.columnNames.includes('category_id')
            );
            if (foreignKey) {
                await queryRunner.dropForeignKey('search_suggestions', foreignKey);
            }
            await queryRunner.dropTable('search_suggestions');
        }
    }

}
