import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddOrderStatusInVendorSetting1742463072242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnSellerLog2PathExist = await queryRunner.hasColumn('vendor_settings', 'order_status');

        if (!columnSellerLog2PathExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'order_status',
                    type: 'int',
                    length: '11',
                    isNullable: true,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
