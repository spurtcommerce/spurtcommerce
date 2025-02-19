import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnTable1561967809283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `order_log` CHANGE `order_prefix_id` `order_prefix_id` VARCHAR(255) DEFAULT NULL');
        await queryRunner.query('ALTER TABLE `settings` CHANGE `zone_id` `zone_id` VARCHAR(255) DEFAULT NULL');
        await queryRunner.query('ALTER TABLE `country` CHANGE `address_format` `address_format` TEXT DEFAULT NULL');
        await queryRunner.query('ALTER TABLE `order_product` CHANGE `total` `total` decimal(15,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `order_product` CHANGE `product_price` `product_price` decimal(15,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `order_total` CHANGE `value` `value` decimal(15,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `order` CHANGE `total` `total` decimal(10,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `customer` CHANGE `zone_id` `zone_id` VARCHAR(255) DEFAULT NULL');
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `order_log` CHANGE `order_prefix_id` `order_prefix_id` VARCHAR(255) DEFAULT NULL');
        await queryRunner.query('ALTER TABLE `settings` CHANGE `zone_id` `zone_id` VARCHAR(255) DEFAULT NULL');
        await queryRunner.query('ALTER TABLE `country` CHANGE `address_format` `address_format` TEXT DEFAULT NULL');
        await queryRunner.query('ALTER TABLE `order_product` CHANGE `total` `total` decimal(15,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `order_product` CHANGE `product_price` `product_price` decimal(15,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `order_total` CHANGE `value` `value` decimal(15,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `order` CHANGE `total` `total` decimal(10,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `customer` CHANGE `zone_id` `zone_id` VARCHAR(255) DEFAULT NULL');
    }
}
