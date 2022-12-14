import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreatePaymentItemsTable1581420780474 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
                name: 'fk_tbl_paymentItems_tbl_payment_foreignKey',
                columnNames: ['payment_id'],
                referencedColumnNames: ['payment_id'],
                referencedTableName: 'payment',
                onDelete: 'CASCADE',
    });
    private tableForeignKeyy = new TableForeignKey({
                name: 'fk_tbl_paymentItems_tbl_orderProduct_foreignKey',
                columnNames: ['order_product_id'],
                referencedColumnNames: ['order_product_id'],
                referencedTableName: 'order_product',
                onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'payment_items',
            columns: [
                {
                    name: 'payment_item_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'payment_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'order_product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'total_amount',
                    type: 'DECIMAL',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'product_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'product_quantity',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'product_price',
                    type: 'DECIMAL',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('payment_items');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
        const ifDataExsistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
        if (!ifDataExsistt) {
            await queryRunner.createForeignKey(table, this.tableForeignKeyy);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('payment_items', true);
    }

}
