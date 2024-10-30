import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorOrderArchive1581586440986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('vendor_order_archive', 'commission');
        if (!ifExist) {
            await queryRunner.addColumn('vendor_order_archive', new TableColumn({
                name: 'commission',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
            }));
        }
        const ifExistt = await queryRunner.hasColumn('vendor_order_archive', 'order_product_id');
        if (!ifExistt) {
            await queryRunner.addColumn('vendor_order_archive', new TableColumn({
                name: 'order_product_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: false,
            }));
        }

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('vendor_order_archive', 'commission');
        await queryRunner.dropColumn('vendor_order_archive', 'order_product_id');
    }

}
