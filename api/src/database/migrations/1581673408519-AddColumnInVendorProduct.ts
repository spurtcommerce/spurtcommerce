import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorProduct1581673408519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('vendor_product', 'vendor_product_commission');
        if (!ifExist) {
            await queryRunner.addColumn('vendor_product', new TableColumn({
                name: 'vendor_product_commission',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('vendor_product', 'vendor_product_commission');
    }

}
