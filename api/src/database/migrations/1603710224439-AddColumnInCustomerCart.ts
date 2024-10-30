import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCustomerCart1603710224439 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('customer_cart', 'sku_name');
        if (!ifExist) {
        await queryRunner.addColumn('customer_cart', new TableColumn({
                name: 'sku_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist1 = await queryRunner.hasColumn('customer_cart', 'varient_name');
        if (!ifExist1) {
        await queryRunner.addColumn('customer_cart', new TableColumn({
                name: 'varient_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist2 = await queryRunner.hasColumn('customer_cart', 'product_varient_option_id');
        if (!ifExist2) {
        await queryRunner.addColumn('customer_cart', new TableColumn({
                name: 'product_varient_option_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('customer_cart', 'sku_name');
        await queryRunner.dropColumn('customer_cart', 'varient_name');
        await queryRunner.dropColumn('customer_cart', 'product_varient_option_id');
    }

}
