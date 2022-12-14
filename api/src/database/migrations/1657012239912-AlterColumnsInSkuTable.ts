import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnsInSkuTable1657012239912 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `sku` CHANGE `min_quantity_allowed_cart` `min_quantity_allowed_cart` int DEFAULT 1' );
        await queryRunner.query('ALTER TABLE `sku` CHANGE `max_quantity_allowed_cart` `max_quantity_allowed_cart` int DEFAULT 5' );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `sku` CHANGE `min_quantity_allowed_cart` `min_quantity_allowed_cart` int DEFAULT 1' );
        await queryRunner.query('ALTER TABLE `sku` CHANGE `max_quantity_allowed_cart` `max_quantity_allowed_cart` int DEFAULT 5' );
    }
}
