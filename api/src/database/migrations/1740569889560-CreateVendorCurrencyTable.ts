import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm';

export class CreateVendorCurrencyTable1740569889560 implements MigrationInterface {
    private tableForeignKeysTenantId = new TableForeignKey({
        name: 'fk_vendor_currency_tenant_id',
        columnNames: ['tenant_id'],
        referencedColumnNames: ['vendor_id'],
        referencedTableName: 'vendor',
        onDelete: 'CASCADE',
    });

    private tableForeignKeysCurrencyId = new TableForeignKey({
        name: 'fk_vendor_currency_currency_id',
        columnNames: ['currency_id'],
        referencedColumnNames: ['currency_id'],
        referencedTableName: 'currency',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExsist = await queryRunner.hasTable('vendor_currency');
        if (!ifExsist) {
            const table = new Table({
                name: 'vendor_currency',
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
                        name: 'tenant_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'currency_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'is_active',
                        type: 'tinyint',
                        default: 1,
                        comment: '0-IN-ACTIVE, 1-ACTIVE',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_delete',
                        type: 'tinyint',
                        default: 0,
                        comment: '0-NOT DELETE, 1-DELETED',
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
                ],
            });
            await queryRunner.createTable(table);

            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
            if (!ifDataExsist) {
                await queryRunner.createForeignKey(table, this.tableForeignKeysTenantId);
            }

            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('currency_id') !== -1);
            if (!ifDataExsist1) {
                await queryRunner.createForeignKey(table, this.tableForeignKeysCurrencyId);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
