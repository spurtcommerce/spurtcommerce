import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnInProductTable1657012922452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `product` CHANGE `has_stock` `has_stock` int DEFAULT 1' );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `product` CHANGE `has_stock` `has_stock` int DEFAULT 1' );
    }

}
