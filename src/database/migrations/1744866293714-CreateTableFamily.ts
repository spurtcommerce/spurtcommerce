import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableFamily1744866293714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable('family');
        if (!tableExist) {
            const table = new Table({
                name: 'family',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'is_active',
                        type: 'tinyint',
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'is_delete',
                        type: 'tinyint',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'tenant_id',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            });

            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
