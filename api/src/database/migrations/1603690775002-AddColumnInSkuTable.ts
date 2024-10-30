import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInSkuTable1603690775002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist1 = await queryRunner.hasColumn('sku', 'out_of_stock_threshold');
        if (!ifExist1) {
        await queryRunner.addColumn('sku', new TableColumn({
                name: 'out_of_stock_threshold',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist2 = await queryRunner.hasColumn('sku', 'notify_min_quantity_below');
        if (!ifExist2) {
        await queryRunner.addColumn('sku', new TableColumn({
                name: 'notify_min_quantity_below',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist3 = await queryRunner.hasColumn('sku', 'min_quantity_allowed_cart');
        if (!ifExist3) {
        await queryRunner.addColumn('sku', new TableColumn({
                name: 'min_quantity_allowed_cart',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist4 = await queryRunner.hasColumn('sku', 'max_quantity_allowed_cart');
        if (!ifExist4) {
        await queryRunner.addColumn('sku', new TableColumn({
                name: 'max_quantity_allowed_cart',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist5 = await queryRunner.hasColumn('sku', 'enable_back_orders');
        if (!ifExist5) {
        await queryRunner.addColumn('sku', new TableColumn({
                name: 'enable_back_orders',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('sku', 'out_of_stock_threshold');
        await queryRunner.dropColumn('sku', 'notify_min_quantity_below');
        await queryRunner.dropColumn('sku', 'max_quantity_allowed_cart');
        await queryRunner.dropColumn('sku', 'min_quantity_allowed_cart');
        await queryRunner.dropColumn('sku', 'enable_back_orders');
    }

}
