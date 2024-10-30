import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnSkuBackOrderStockLimit1727156005915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('sku', 'back_order_stock_limit');

        if (!columnExist) {
            await queryRunner.addColumn('sku', new TableColumn(
                {
                    name: 'back_order_stock_limit',
                    type: 'int',
                    isNullable: true,
                    default: 0,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
