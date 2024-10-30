import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class RemoveConstraintInVendorPaymentArchive1588825405897 implements MigrationInterface {
    private tableForeignKeyyy = new TableForeignKey({
        name: 'fk_tbl_vendorPaymentArchive_tbl_paymentItems_foreignKey',
        columnNames: ['payment_item_id'],
        referencedColumnNames: ['payment_item_id'],
        referencedTableName: 'payment_items',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('vendor_payment_archive');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('vendor_payment_archive');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_item_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
        }
    }

}
