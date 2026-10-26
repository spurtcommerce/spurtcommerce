import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateRazorpayOrderTransactionTable1581677738757 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
                name: 'fk_tbl_razorpayOrderTransaction_tbl_razorpayOrder_foreignKey',
                columnNames: ['razorpay_order_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'razorpay_order',
                onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'razorpay_order_transaction',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'razorpay_order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'payment_type',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'payment_data',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'payment_status',
                    type: 'integer',
                    length: '11',
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
        const ifExsist = await queryRunner.hasTable('razorpay_order_transaction');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const getTable = await queryRunner.getTable('razorpay_order_transaction');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('razorpay_order_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('razorpay_order_transaction', true);
    }

}
