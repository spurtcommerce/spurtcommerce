import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class RemoveConstraintInVendorPayment1588824849920 implements MigrationInterface {
    private tableForeignKeyy = new TableForeignKey({
        name: 'fk_tbl_vendorPayment_tbl_paymentItems_foreignKey',
        columnNames: ['payment_item_id'],
        referencedColumnNames: ['payment_item_id'],
        referencedTableName: 'payment_items',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('vendor_payment');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeyy);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('vendor_payment');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeyy);
        }
    }

}
