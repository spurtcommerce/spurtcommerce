import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateOrderProductLogTable1582183277124 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_orderProductLog_tbl_orderProduct_foreignKey',
        columnNames: ['order_product_id'],
        referencedColumnNames: ['order_product_id'],
        referencedTableName: 'order_product',
        onDelete: 'CASCADE',
    });

    private tableForeignKeyy = new TableForeignKey({
        name: 'fk_tbl_orderProductLog_tbl_product_foreignKey',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });

    private tableForeignKeyyy = new TableForeignKey({
        name: 'fk_tbl_orderProductLog_tbl_order_foreignKey',
        columnNames: ['order_id'],
        referencedColumnNames: ['order_id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
    });

    private tableForeignKeyyyy = new TableForeignKey({
        name: 'fk_tbl_orderProductLog_tbl_orderStatus_foreignKey',
        columnNames: ['order_status_id'],
        referencedColumnNames: ['order_status_id'],
        referencedTableName: 'order_status',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'order_product_log',
            columns: [
                {
                    name: 'order_product_log_id',
                    type: 'integer',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'order_product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'product_price',
                    type: 'DECIMAL(15,2)',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'model',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'quantity',
                    type: 'integer',
                    length: '4',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'trace',
                    type: 'DECIMAL(15,4)',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'total',
                    type: 'DECIMAL(15,4)',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'tax',
                    type: 'DECIMAL(15,4)',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'order_status_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'tracking_url',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'tracking_no',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
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
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('order_product_log');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
        const ifDataExsistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsistt) {
            await queryRunner.createForeignKey(table, this.tableForeignKeyy);
        }
        const ifDataExsisttt = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
        if (!ifDataExsisttt) {
            await queryRunner.createForeignKey(table, this.tableForeignKeyyy);
        }
        const ifDataExsistttt = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_status_id') !== -1);
        if (!ifDataExsistttt) {
            await queryRunner.createForeignKey(table, this.tableForeignKeyyyy);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('order_product_log', true);
    }

}
