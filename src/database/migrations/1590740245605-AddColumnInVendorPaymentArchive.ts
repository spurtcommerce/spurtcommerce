import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorPaymentArchive1590740245605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor_payment_archive', 'vendor_order_archive');
        if (!ifExist) {
        await queryRunner.addColumn('vendor_payment_archive', new TableColumn({
                name: 'vendor_order_archive',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor_payment_archive', 'order_archive');
    }

}
