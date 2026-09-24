import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVendorSetting1737028684787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vendor_settings',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'vendor_id',
                        type: 'int',
                    },
                    {
                        name: 'plugins',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'invoice_prefix',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'invoice_logo_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'invoice_logo_path',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'is_maintenance',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'store_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'store_logo_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'store_logo_path',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'store_email',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'store_mobile_no',
                        type: 'varchar',
                        length: '20',
                        isNullable: true,
                    },
                    {
                        name: 'store_url',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'store_address_line_1',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'store_address_line_2',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'store_country_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'store_state_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'store_city',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'store_zipcode',
                        type: 'varchar',
                        length: '20',
                        isNullable: true,
                    },
                    {
                        name: 'store_currency_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'store_language_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'store_time_zone',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'seller_logo_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'seller_logo_path',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['vendor_id'],
                        referencedTableName: 'vendor', // assuming the name of the vendor table is 'vendor'
                        referencedColumnNames: ['vendor_id'],
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vendor_settings');
    }

}
