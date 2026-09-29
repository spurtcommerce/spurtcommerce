import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValuesInPaymentMethodTable1750141256684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO payment_method (name, slug, sort_order, is_active, is_delete, created_date)
            VALUES
              ('Payment Terms', 'payment-terms', 1, 1, 0, NOW()),
              ('Check/Money Order', 'check-money-order', 2, 1, 0, NOW());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
