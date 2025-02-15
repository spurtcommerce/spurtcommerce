import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVendorCustomerForeignKey1721049011047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM vendor
            WHERE customer_id NOT IN (SELECT id FROM customer)
        `);
        await queryRunner.query(`
            ALTER TABLE vendor
            ADD CONSTRAINT fk_vendor_customer_customer_id
            FOREIGN KEY (customer_id) REFERENCES customer(id)
            ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
