import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm';

export class CreateVendorUserTable1738909044872 implements MigrationInterface {

    private tableForeignKeys = new TableForeignKey({
        name: 'fk_vendor_users_vendor',
        columnNames: ['tenant_id'],
        referencedColumnNames: ['vendor_id'],
        referencedTableName: 'vendor',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExsist = await queryRunner.hasTable('vendor_users');
        if (!ifExsist) {
            const table = new Table({
                name: 'vendor_users',
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
                        name: 'username',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '255',
                        default: 0,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        length: '255',
                        default: 0,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'avatar_path',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'ip',
                        type: 'varchar',
                        length: '15',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'phone_number',
                        type: 'bigint',
                        unsigned: true,
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
                        name: 'delete_flag',
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
                        name: 'forget_password_link_expires',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'forget_password_key',
                        type: 'varchar',
                        length: '255',
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
                    {
                        name: 'is_super_vendor',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                    },

                ],
            });
            await queryRunner.createTable(table);

            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
            if (!ifDataExsist) {
                await queryRunner.createForeignKey(table, this.tableForeignKeys);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
