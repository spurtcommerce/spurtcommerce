import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderProductTable1584011252176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order_product', 'discount_amount');
        if (!ifExist) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'discount_amount',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
                default: 0,
               }));
        }

        const ifExist1 = await queryRunner.hasColumn('order_product', 'discounted_amount');
        if (!ifExist1) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'discounted_amount',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
               }));
        }

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order_product', 'discount_amount');
    }

}
