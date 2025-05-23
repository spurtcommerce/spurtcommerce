import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableOrderProductCancelLogTable1743501439629 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_order_product_cancel_log_order_product_order_product_id',
        columnNames: ['order_product_id'],
        referencedColumnNames: ['order_product_id'],
        referencedTableName: 'order_product',
        onDelete: 'RESTRICT',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable('order_product_cancel_log');
        if (!tableExist) {
            const table = new Table({
                name: 'order_product_cancel_log',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'order_product_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['approve', 'reject', 'pending'],
                        isNullable: false,
                    },
                    {
                        name: 'comments',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            });

            await queryRunner.createTable(table);
            const getTable = await queryRunner.getTable('order_product_cancel_log');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
            if (!ifDataExsist) {
                await queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
