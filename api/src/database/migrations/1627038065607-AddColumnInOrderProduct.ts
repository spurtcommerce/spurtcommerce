import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderProduct1627038065607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExistCreatedDate = await queryRunner.hasColumn('order_product', 'coupon_discount_amount');
        if (!ifExistCreatedDate) {
            await queryRunner.addColumn('order_product', new TableColumn({
                name: 'coupon_discount_amount',
                type: 'decimal',
                length: '16,2',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_product', 'coupon_discount_amount');
    }

}
