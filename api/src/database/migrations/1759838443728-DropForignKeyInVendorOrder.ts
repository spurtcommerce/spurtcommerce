import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropForignKeyInVendorOrder1759838443728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor_orders');
        if (!table) {
            return;
        }

        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes('order_id'));
        if (foreignKey) {
            await queryRunner.dropForeignKey(table, foreignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
