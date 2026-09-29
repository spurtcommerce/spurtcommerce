import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderStatusTable1759212923317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0;`);

        await queryRunner.query(`TRUNCATE TABLE order_option;`);
        await queryRunner.query(`TRUNCATE TABLE coupon_usage_product;`);
        await queryRunner.query(`TRUNCATE TABLE order_product_log;`);
        await queryRunner.query(`TRUNCATE TABLE payment_items;`);
        await queryRunner.query(`TRUNCATE TABLE payment_items_archive;`);
        await queryRunner.query(`TRUNCATE TABLE product_rating;`);
        await queryRunner.query(`TRUNCATE TABLE vendor_invoice_item;`);
        await queryRunner.query(`TRUNCATE TABLE order_product;`);
        await queryRunner.query(`TRUNCATE TABLE order_history;`);
        await queryRunner.query(`TRUNCATE TABLE order_status_to_fulfillment;`);
        await queryRunner.query(`TRUNCATE TABLE coupon_usage;`);
        await queryRunner.query(`TRUNCATE TABLE customer_transaction;`);
        await queryRunner.query(`TRUNCATE TABLE order_total;`);
        await queryRunner.query(`TRUNCATE TABLE payment_archive;`);
        await queryRunner.query(`TRUNCATE TABLE payment;`);
        await queryRunner.query(`TRUNCATE TABLE paypal_order_transaction;`);
        await queryRunner.query(`TRUNCATE TABLE paypal_order;`);
        await queryRunner.query(`TRUNCATE TABLE razorpay_order;`);
        await queryRunner.query(`TRUNCATE TABLE razorpay_order_transaction;`);
        await queryRunner.query(`TRUNCATE TABLE stripe_order;`);
        await queryRunner.query(`TRUNCATE TABLE stripe_order_transaction;`);
        await queryRunner.query(`TRUNCATE TABLE vendor_invoice;`);
        await queryRunner.query(`TRUNCATE TABLE vendor_order_archive_log;`);
        await queryRunner.query(`TRUNCATE TABLE vendor_order_archive;`);
        await queryRunner.query(`TRUNCATE TABLE vendor_orders_log;`);
        await queryRunner.query(`TRUNCATE TABLE settlement_item;`);
        await queryRunner.query(`TRUNCATE TABLE vendor_payment_archive;`);
        await queryRunner.query(`TRUNCATE TABLE vendor_payment;`);
        await queryRunner.query(`TRUNCATE TABLE vendor_orders;`);
        await queryRunner.query(`TRUNCATE TABLE \`order\`;`);
        await queryRunner.query(`TRUNCATE TABLE order_status;`);

        await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1;`);

        await queryRunner.query(`
            ALTER TABLE order_status
            ADD COLUMN description VARCHAR(255) DEFAULT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
