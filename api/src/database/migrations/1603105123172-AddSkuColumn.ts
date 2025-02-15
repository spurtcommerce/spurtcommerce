import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddSkuColumn1603105123172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product_discount', 'sku_id');
        if (!ifExist) {
        await queryRunner.addColumn('product_discount', new TableColumn({
                name: 'sku_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist1 = await queryRunner.hasColumn('product_special', 'sku_id');
        if (!ifExist1) {
        await queryRunner.addColumn('product_special', new TableColumn({
                name: 'sku_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist2 = await queryRunner.hasColumn('product_tire_price', 'sku_id');
        if (!ifExist2) {
        await queryRunner.addColumn('product_tire_price', new TableColumn({
                name: 'sku_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product_discount', 'sku_id');
        await queryRunner.dropColumn('product_special', 'sku_id');
        await queryRunner.dropColumn('product_tire_price', 'sku_id');
    }

}
