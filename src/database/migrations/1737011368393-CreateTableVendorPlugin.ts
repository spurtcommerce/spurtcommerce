import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVendorPlugin1737011368393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vendor_plugin',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'vendor_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'plugin_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'plugin_additional_info',
                        type: 'json',
                        isNullable: true, // The column can be nullable as it might not always be populated
                    },
                    {
                        name: 'is_active',
                        type: 'tinyint',
                        default: 1, // Default to true if not specified
                        isNullable: false,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP', // Update timestamp when modified
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'varchar',
                        length: '255',
                        isNullable: true, // Can be null if not modified by anyone
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['vendor_id'],
                        referencedTableName: 'vendor', // Assuming the referenced table is 'vendor'
                        referencedColumnNames: ['vendor_id'], // Assuming 'id' is the primary key of the 'vendor' table
                    },
                    {
                        columnNames: ['plugin_id'],
                        referencedTableName: 'plugins', // Assuming the referenced table is 'plugin'
                        referencedColumnNames: ['id'], // Assuming 'id' is the primary key of the 'plugin' table
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vendor_plugin');
    }
}
