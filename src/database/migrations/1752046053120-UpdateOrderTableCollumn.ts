import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateOrderTableCollumn1752046053120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const hasColumn = await queryRunner.hasColumn('order', 'order_source');
        if (hasColumn) {
            await queryRunner.dropColumn('order', 'order_source');
        }

        await queryRunner.addColumn('order', new TableColumn({
            name: 'order_source',
            type: 'enum',
            enum: ['quote', 'rfq', 'shopping-cart', 'quick-order'],
            isNullable: true,
        }));

        const isCopyRightsColumnExist = await queryRunner.hasColumn('vendor_settings', 'copyrights');
        if (!isCopyRightsColumnExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn({
                name: 'copyrights',
                type: 'text',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
