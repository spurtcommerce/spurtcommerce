import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCustomerCart1590588151010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('customer_cart', 'tire_price');
        if (!ifExist) {
        await queryRunner.addColumn('customer_cart', new TableColumn({
                name: 'tire_price',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor', 'vendor_slug_name');
    }

}
