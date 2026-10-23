import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnProductTypeToProductTable1792749275688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasColumn = await queryRunner.hasColumn('product', 'product_type');
        if (!hasColumn) {
            await queryRunner.addColumn(
                'product',
                new TableColumn({
                    name: 'product_type',
                    type: 'enum',
                    enum: ['physical', 'virtual', 'giftcard'],
                    isNullable: false,
                    default: "'physical'",
                })
            );
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
