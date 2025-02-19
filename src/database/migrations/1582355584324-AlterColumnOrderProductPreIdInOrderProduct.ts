import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AlterColumnOrderProductPreIdInOrderProduct1582355584324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExistt = await queryRunner.hasColumn('order_product', 'order_product_prefix_id');
        if (!ifExistt) {
            await queryRunner.addColumn('order_product', new TableColumn({
                name: 'order_product_prefix_id',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `order_product` CHANGE `order_product_prefix_id` `order_product_prefix_id` varchar(255) DEFAULT NULL' );
    }

}
