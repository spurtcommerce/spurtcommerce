import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCustomerUsersGroup1749618682749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'customer_user_group',
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
                        length: '64',
                        isNullable: true,
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        length: '64',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'tinyint',
                        default: 1,
                    },
                    {
                        name: 'permission',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'role_type',
                        type: 'enum',
                        enum: ['predefined', 'custom'],
                        default: `'custom'`,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true,
                        comment: 'CREATED USER ID',
                    },
                    {
                        name: 'created_date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: true,
                        comment: 'CREATED SYSTEM DATE',
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        isNullable: true,
                        comment: 'MODIFIED USER ID',
                    },
                    {
                        name: 'modified_date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                        isNullable: true,
                        comment: 'LAST MODIFIED DATE',
                    },
                    {
                        name: 'tenant_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
