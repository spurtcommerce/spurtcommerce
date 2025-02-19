import {MigrationInterface, QueryRunner, TableForeignKey, Table} from 'typeorm';

export class CreateProductPriceLogTable1573823878115 implements MigrationInterface {
    private ProductPriceLogToProductForeignKeys = new TableForeignKey({
        name: 'fk_tbl_product_price_log_tbl_product_foreignKey',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });
    private ProductPriceLogToVendorForeignKeys = new TableForeignKey({
        name: 'fk_tbl_product_price_log_tbl_vendor_foreignKey',
        columnNames: ['vendor_id'],
        referencedColumnNames: ['vendor_id'],
        referencedTableName: 'vendor',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'product_price_log',
            columns: [
                {
                    name: 'product_price_log_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'vendor_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                },  {
                    name: 'sku',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'price',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'special_price',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'special_start_date',
                    type: 'date',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'special_end_date',
                    type: 'date',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'discount_price',
                    type: 'decimal',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'discount_start_date',
                    type: 'date',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'discount_end_date',
                    type: 'date',
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
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('product_price_log');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.ProductPriceLogToProductForeignKeys);
        }

        const ifDataExist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
        if (!ifDataExist) {
            await queryRunner.createForeignKey(table, this.ProductPriceLogToVendorForeignKeys);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('product_price_log', true);
    }

}
