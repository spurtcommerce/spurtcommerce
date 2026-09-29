import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIndexProductRelatedTable1566206489111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `product_discount` ADD INDEX `priority` (`priority`)');
        await queryRunner.query('ALTER TABLE `product_discount` ADD INDEX `date_start` (`date_start`)');
        await queryRunner.query('ALTER TABLE `product_discount` ADD INDEX `date_end` (`date_end`)');
        await queryRunner.query('ALTER TABLE `product_discount` ADD INDEX `price` (`price`)');
        await queryRunner.query('ALTER TABLE `product_image` ADD INDEX `default_image` (`default_image`)');
        await queryRunner.query('ALTER TABLE `product` ADD INDEX `manufacturer_id` (`manufacturer_id`)');
        await queryRunner.query('ALTER TABLE `product` ADD INDEX `condition` (`condition`)');
        await queryRunner.query('ALTER TABLE `product` ADD INDEX `today_deals` (`today_deals`)');
        await queryRunner.query('ALTER TABLE `product` ADD INDEX `is_featured` (`is_featured`)');
        await queryRunner.query('ALTER TABLE `product` ADD INDEX `is_active` (`is_active`)');
        await queryRunner.query('ALTER TABLE `product_special` ADD INDEX `date_end` (`date_end`)');
        await queryRunner.query('ALTER TABLE `product_special` ADD INDEX `start_end` (`date_end`)');
        await queryRunner.query('ALTER TABLE `product_special` ADD INDEX `priority` (`priority`)');
        await queryRunner.query('ALTER TABLE `product_special` ADD INDEX `price` (`price`)');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropIndex('product', 'manufacturer_id');
        await queryRunner.dropIndex('product', 'condition');
        await queryRunner.dropIndex('product', 'is_featured');
        await queryRunner.dropIndex('product', 'today_deals');
        await queryRunner.dropIndex('product_image', 'default_image');
        await queryRunner.dropIndex('product_discount', 'date_start');
        await queryRunner.dropIndex('product_discount', 'date_end');
        await queryRunner.dropIndex('product_discount', 'priority');
        await queryRunner.dropIndex('product_discount', 'price');
        await queryRunner.dropIndex('product_option_value', 'product_option_id');
        await queryRunner.dropIndex('product_special', 'date_start');
        await queryRunner.dropIndex('product_special', 'date_end');
        await queryRunner.dropIndex('product_special', 'priority');
        await queryRunner.dropIndex('product_special', 'price');
    }

}
