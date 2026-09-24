import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropForignKeyColumnOrderLogTable1718257060999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('order_log');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.query(`ALTER TABLE order_log DROP FOREIGN KEY fk_order_log_customer_customer_id`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
