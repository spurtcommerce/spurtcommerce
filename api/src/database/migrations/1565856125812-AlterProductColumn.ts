import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterProductColumn1565856125812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `currency` CHANGE `value` `value` float(15,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_discount` CHANGE `price` `price` decimal(15,2) DEFAULT NULL' );

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `currency` CHANGE `value` `value` float(15,2) DEFAULT NULL' );
        await queryRunner.query('ALTER TABLE `product_discount` CHANGE `price` `price` decimal(15,2) DEFAULT NULL' );
    }

}
