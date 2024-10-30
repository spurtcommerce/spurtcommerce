import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableCustomerToGroup1715666127193 implements MigrationInterface {

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_customer_to_group_customer_group__id',
        columnNames: ['customer_group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer_group',
        onDelete: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_customer_to_group_customer__id',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {

        const table = new Table(
            {

                name: 'customer_to_group',
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
                        name: 'customer_group_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            }
        );

        await queryRunner.createTable(table, true);

        const getTable = await queryRunner.getTable('customer_to_group');

        const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey2);
        }

        const ifDataExsist2 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('customer_group_id') !== -1);
        if (!ifDataExsist2) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey1);
        }

        // }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
