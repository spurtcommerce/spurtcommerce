import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProductTable1589003393774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('product', 'has_stock');
        if (!ifExist) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'has_stock',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
        const ifExist1 = await queryRunner.hasColumn('product', 'has_tire_price');
        if (!ifExist1) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'has_tire_price',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }

        const ifExist2 = await queryRunner.hasColumn('product', 'out_of_stock_threshold');
        if (!ifExist2) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'out_of_stock_threshold',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist3 = await queryRunner.hasColumn('product', 'notify_min_quantity_below');
        if (!ifExist3) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'notify_min_quantity_below',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }

        const ifExist4 = await queryRunner.hasColumn('product', 'min_quantity_allowed_cart');
        if (!ifExist4) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'min_quantity_allowed_cart',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }

        const ifExist5 = await queryRunner.hasColumn('product', 'max_quantity_allowed_cart');
        if (!ifExist5) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'max_quantity_allowed_cart',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }

        const ifExist6 = await queryRunner.hasColumn('product', 'enable_back_orders');
        if (!ifExist6) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'enable_back_orders',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('product', 'enable_back_orders');
        await queryRunner.dropColumn('product', 'max_quantity_allowed_cart');
        await queryRunner.dropColumn('product', 'min_quantity_allowed_cart');
        await queryRunner.dropColumn('product', 'notify_min_quantity_below');
        await queryRunner.dropColumn('product', 'out_of_stock_threshold');
        await queryRunner.dropColumn('product', 'has_stock');
        await queryRunner.dropColumn('product', 'has_stire_price');
    }

}
