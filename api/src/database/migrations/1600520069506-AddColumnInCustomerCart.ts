import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCustomerCart1600520069506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('customer_cart', 'product_option_value_id');
        if (!ifExist) {
        await queryRunner.addColumn('customer_cart', new TableColumn({
                name: 'product_option_value_id',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('customer_cart', 'product_option_value_id');
    }

}
