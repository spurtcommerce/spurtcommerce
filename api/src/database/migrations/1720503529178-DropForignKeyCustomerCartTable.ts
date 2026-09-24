import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropForignKeyCustomerCartTable1720503529178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('customer_cart');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.query(`ALTER TABLE customer_cart DROP FOREIGN KEY fk_customer_cart_customer_customer_id`);
        }
        await queryRunner.query(`UPDATE customer_cart SET customer_id= 0 WHERE customer_id IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
