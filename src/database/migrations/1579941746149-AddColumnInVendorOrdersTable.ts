import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from 'typeorm';

export class AddColumnInVendorOrdersTable1579941746149 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_order_product_tbl_vendor_order_foreignKey',
        columnNames: ['order_product_id'],
        referencedColumnNames: ['order_product_id'],
        referencedTableName: 'order_product',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('vendor_orders', 'commission');
        if (!ifExist) {
            await queryRunner.addColumn('vendor_orders', new TableColumn({
                name: 'commission',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExistt = await queryRunner.hasColumn('vendor_orders', 'order_product_id');
        if (!ifExistt) {
            await queryRunner.addColumn('vendor_orders', new TableColumn({
                name: 'order_product_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const table = await queryRunner.getTable('vendor_orders');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('vendor_orders', 'commission');
        await queryRunner.dropColumn('vendor_orders', 'order_product_id');
    }

}
