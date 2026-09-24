import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateVendorUserGroupTable1738910305300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExsist = await queryRunner.hasTable('vendor_user_group');
        if (!ifExsist) {
            const table = new Table({
                name: 'vendor_user_group',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '64',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        length: '64',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'permission',
                        type: 'text',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        comment: 'CREATED USER ID',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'datetime',
                        comment: 'CREATED SYSTEM DATE',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        comment: 'MODIFIED USER ID',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'datetime',
                        comment: 'LAST MODIFIED DATE',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'tenant_id',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                    },
                ],
            });
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
