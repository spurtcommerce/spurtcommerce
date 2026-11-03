import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateApiKeyModelTable1793600124084 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const ifExists = await queryRunner.hasTable('api_key');

        if (!ifExists) {
            const table = new Table({
                name: 'api_key',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'tenant_id',
                        type: 'int',
                        length: '11',
                        isNullable: false,
                    },
                    {
                        name: 'api_key_hash',
                        type: 'varchar',
                        length: '64',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'expiry_type',
                        type: 'enum',
                        enum: [
                            '1_day',
                            '7_days',
                            '1_month',
                            '1_year',
                            'lifetime',
                        ],
                        isNullable: false,
                    },
                    {
                        name: 'expire_date',
                        type: 'datetime',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'tinyint',
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'api_key_encrypted',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'datetime',
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_date',
                        type: 'datetime',
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
                indices: [
                    {
                        name: 'IDX_API_KEY_TENANT_ID',
                        columnNames: ['tenant_id'],
                    },
                ],
            });

            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const ifExists = await queryRunner.hasTable('api_key');

        if (ifExists) {
            await queryRunner.dropTable('api_key', true);
        }
    }

}
