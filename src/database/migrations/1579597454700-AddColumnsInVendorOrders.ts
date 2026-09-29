import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnsInVendorOrders1579597454700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('vendor_orders', 'tracking_url');
        const ifExistt = await queryRunner.hasColumn('vendor_orders', 'tracking_no');
        if (!ifExist) {
            await queryRunner.addColumn('vendor_orders', new TableColumn({
                name: 'tracking_url',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

        if (!ifExistt) {
            await queryRunner.addColumn('vendor_orders', new TableColumn({
                name: 'tracking_no',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('vendor_orders', 'tracking_url');
        await queryRunner.dropColumn('vendor_orders', 'tracking_no');
    }

}
