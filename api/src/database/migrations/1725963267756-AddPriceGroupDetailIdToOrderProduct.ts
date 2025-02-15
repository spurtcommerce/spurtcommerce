import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPriceGroupDetailIdToOrderProduct1725963267756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order_product', new TableColumn({
            name: 'price_group_detail_id',
            type: 'int',
            isNullable: true, // Change this to false if you want it to be required
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_product', 'price_group_detail_id');
    }

}
