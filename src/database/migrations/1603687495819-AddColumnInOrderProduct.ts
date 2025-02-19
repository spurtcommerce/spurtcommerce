import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderProduct1603687495819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('order_product', 'varient_name');
        if (!ifExist) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'varient_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist1 = await queryRunner.hasColumn('order_product', 'product_varient_option_id');
        if (!ifExist1) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'product_varient_option_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_product', 'varient_name');
        await queryRunner.dropColumn('order_product', 'product_varient_option_id');
    }

}
