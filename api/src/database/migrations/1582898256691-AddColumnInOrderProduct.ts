import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderProduct1582898256691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order_product', 'base_price');
        if (!ifExist) {
            await queryRunner.addColumn('order_product', new TableColumn({
                name: 'base_price',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist1 = await queryRunner.hasColumn('order_product', 'tax_type');
        if (!ifExist1) {
            await queryRunner.addColumn('order_product', new TableColumn({
                name: 'tax_type',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist2 = await queryRunner.hasColumn('order_product', 'tax_value');
        if (!ifExist2) {
            await queryRunner.addColumn('order_product', new TableColumn({
                name: 'tax_value',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order_product', 'tax_value');
    }

}
