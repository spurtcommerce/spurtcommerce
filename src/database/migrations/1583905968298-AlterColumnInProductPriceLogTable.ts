import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnInProductPriceLogTable1583905968298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `price` `price` DECIMAL(10,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_price` `special_price` DECIMAL(10,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_start_date` `special_start_date` Date DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_end_date` `special_end_date` Date DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_price` `discount_price` DECIMAL(10,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_start_date` `discount_start_date` Date DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_end_date` `discount_end_date` Date DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `price` `price` DECIMAL(10,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_price` `special_price` DECIMAL(10,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_start_date` `special_start_date` Date DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_end_date` `special_end_date` Date DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_price` `discount_price` DECIMAL(10,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_start_date` `discount_start_date` Date DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_end_date` `discount_end_date` Date DEFAULT NULL' );
    }

}
