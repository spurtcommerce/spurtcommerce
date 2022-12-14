import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnModelInOrderProductLog1582355542896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `order_product_log` CHANGE `model` `model` varchar(255) DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `order_product_log` CHANGE `model` `model` varchar(255) DEFAULT NULL' );
    }

}
