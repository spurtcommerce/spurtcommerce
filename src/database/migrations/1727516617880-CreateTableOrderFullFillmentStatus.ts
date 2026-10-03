import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOrderFullFillmentStatus1727516617880 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_fulfillment_status',
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
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'priority',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'parent_id',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'default_status',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_admin',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_vendor',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_buyer',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_api',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'color_code',
                        type: 'varchar',
                        length: '7',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_fulfillment_status');
    }

}
