import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorProduct1587555771172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('vendor_product', 'pincode_based_delivery');
        if (!ifExist) {
        await queryRunner.addColumn('vendor_product', new TableColumn({
                name: 'pincode_based_delivery',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 1,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('vendor_product', 'pincode_based_delivery');
    }

}
