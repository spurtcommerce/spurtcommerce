import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class RemoveConstraintInVendorPaymentArchive1590744858042 implements MigrationInterface {
    private tableForeignKeyyy = new TableForeignKey({
        name: 'fk_tbl_vendorPaymentArchive_tbl_vendorOrders_foreignKey',
        columnNames: ['vendor_order_id'],
        referencedColumnNames: ['vednor_order_id'],
        referencedTableName: 'vendor_orders',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor_payment_archive');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_order_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor_payment_archive');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_order_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
        }
    }

}
