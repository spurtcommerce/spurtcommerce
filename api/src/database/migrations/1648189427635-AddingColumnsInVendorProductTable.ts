import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddingColumnsInVendorProductTable1648189427635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor_product', 'sku_id');
        if (!ifExist) {
        await queryRunner.addColumn('vendor_product', new TableColumn({
                name: 'sku_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist1 = await queryRunner.hasColumn('vendor_product', 'reuse');
        if (!ifExist1) {
        await queryRunner.addColumn('vendor_product', new TableColumn({
                name: 'reuse',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
        }));
        }
        const ifExist2 = await queryRunner.hasColumn('vendor_product', 'reuse_status');
        if (!ifExist2) {
        await queryRunner.addColumn('vendor_product', new TableColumn({
                name: 'reuse_status',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor_product', 'sku_id');
        await queryRunner.dropColumn('vendor_product', 'reuse');
        await queryRunner.dropColumn('vendor_product', 'reuse_status');
    }
}
