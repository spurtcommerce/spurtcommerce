import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCustomerPermissionModule1749617929731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'customer_permission_module',
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
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'slug_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'sort_order',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'module_group_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'is_listed',
                    type: 'tinyint',
                    width: 1,
                    isNullable: false,
                    default: '0',
                },
                {
                    name: 'created_by',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'datetime',
                    isNullable: true,
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
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        });

        const exists = await queryRunner.hasTable('customer_permission_module');
        if (!exists) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
