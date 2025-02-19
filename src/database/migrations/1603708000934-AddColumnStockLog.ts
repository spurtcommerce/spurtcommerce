import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnStockLog1603708000934 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('stock_log', 'sku_name');
        if (!ifExist) {
        await queryRunner.addColumn('stock_log', new TableColumn({
                name: 'sku_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('stock_log', 'sku_name');
    }

}
