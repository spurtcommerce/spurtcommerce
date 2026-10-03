import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateVendorPermissionModuleTable1741351003115 implements MigrationInterface {

    private tableForeignKeysModuleGroupId = new TableForeignKey({
        name: 'fk_vendor_permission_module_module_group_id',
        columnNames: ['module_group_id'],
        referencedColumnNames: ['module_group_id'],
        referencedTableName: 'vendor_permission_module_group',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExsist = await queryRunner.hasTable('vendor_permission_module');
        if (!ifExsist) {

            const table = new Table({
                name: 'vendor_permission_module',
                columns: [
                    {
                        name: 'module_id',
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
                        name: 'module_group_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_listed',
                        type: 'tinyint',
                        default: 0,
                        isPrimary: false,
                        isNullable: false,
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

            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('module_group_id') !== -1);
            if (!ifDataExsist1) {
                await queryRunner.createForeignKey(table, this.tableForeignKeysModuleGroupId);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
