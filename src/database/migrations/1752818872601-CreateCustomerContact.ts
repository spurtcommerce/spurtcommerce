import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomerContact1752818872601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'customer_contact',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_address_1',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_address_2',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_city',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_postcode',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_country_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_zone_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_firstname',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_lastname',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'tenant_id',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'is_delete',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
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
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
