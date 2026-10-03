import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVendorSettingsDomain1758865635953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vendor_settings_domain',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'domain_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'vendor_settings_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'vendor_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_delete',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_primary',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
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
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
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
