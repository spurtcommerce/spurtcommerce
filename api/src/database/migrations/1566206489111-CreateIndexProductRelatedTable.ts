import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateIndexProductRelatedTable1566206489111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
       await queryRunner.query('ALTER TABLE `product_image` ADD INDEX `default_image` (`default_image`)');
       await queryRunner.query('ALTER TABLE `product` ADD INDEX `manufacturer_id` (`manufacturer_id`)');
       await queryRunner.query('ALTER TABLE `product` ADD INDEX `condition` (`condition`)');
       await queryRunner.query('ALTER TABLE `product` ADD INDEX `today_deals` (`today_deals`)');
       await queryRunner.query('ALTER TABLE `product` ADD INDEX `is_active` (`is_active`)');
      }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropIndex('product', 'manufacturer_id');
        await queryRunner.dropIndex('product', 'condition');
        await queryRunner.dropIndex('product', 'is_featured');
        await queryRunner.dropIndex('product', 'today_deals');
        await queryRunner.dropIndex('product_image', 'default_image');
       }

}
