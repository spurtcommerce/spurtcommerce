import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderProduct1558005767816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order_product', 'product_price');
        if (!ifExist) {
        await queryRunner.addColumn('order_product', new TableColumn({
            name: 'product_price',
            type: 'DECIMAL(15,2)',
            isPrimary: false,
            isNullable: false,
        }));
    }
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order_product', 'product_price');
    }

}
