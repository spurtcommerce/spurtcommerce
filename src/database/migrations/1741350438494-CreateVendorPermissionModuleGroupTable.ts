import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVendorPermissionModuleGroupTable1741350438494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExsist = await queryRunner.hasTable('vendor_permission_module_group');
        if (!ifExsist) {

            const table = new Table({
                name: 'vendor_permission_module_group',
                columns: [
                    {
                        name: 'module_group_id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'slug_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'sort_order',
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
                        name: 'created_date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
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
                        name: 'modified_date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        isPrimary: false,
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
