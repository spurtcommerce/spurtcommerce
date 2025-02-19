import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProductStockAlert1603707976533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product_stock_alert', 'sku_name');
        if (!ifExist) {
        await queryRunner.addColumn('product_stock_alert', new TableColumn({
                name: 'sku_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product_stock_alert', 'sku_name');
    }

}
