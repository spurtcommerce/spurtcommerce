import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderProduct1603705858963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('order_product', 'sku_name');
        if (!ifExist) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'sku_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_product', 'sku_name');
    }

}
