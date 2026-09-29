import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCustomerUsers1749618404230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'customer_users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'customer_user_group_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '55',
                    isNullable: true,
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'avatar_path',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'code',
                    type: 'varchar',
                    length: '32',
                    isNullable: true,
                },
                {
                    name: 'ip',
                    type: 'varchar',
                    length: '15',
                    isNullable: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    length: '25',
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'tinyint',
                    default: 1,
                },
                {
                    name: 'delete_flag',
                    type: 'tinyint',
                    default: 0,
                },
                {
                    name: 'forget_password_link_expires',
                    type: 'datetime',
                    isNullable: true,
                },
                {
                    name: 'forget_password_key',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
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
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
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
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                    comment: 'LAST MODIFIED DATE',
                },
                {
                    name: 'is_super_customer',
                    type: 'tinyint',
                    isNullable: true,
                },
                {
                    name: 'customer_id',
                    type: 'int',
                    isNullable: true,
                },
            ],
        });

        const exists = await queryRunner.hasTable('customer_users');
        if (!exists) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
