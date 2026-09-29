import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVendorEmailTemplate1750243245868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'vendor_email_template',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isNullable: false,
                },
                {
                    name: 'email_template_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'tinyint',
                    default: 1,
                    length: '1',
                    isNullable: true,
                },
                {
                    name: 'is_default',
                    type: 'tinyint',
                    length: '1',
                    default: 0,
                    isNullable: true,
                },
                {
                    name: 'tenant_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: true,
                },
                {
                    name: 'modified_date',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
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
            ],
        });

        const ifExists = await queryRunner.hasTable('vendor_email_template');
        if (!ifExists) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
