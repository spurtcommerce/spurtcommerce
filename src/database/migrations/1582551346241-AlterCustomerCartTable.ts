import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterCustomerCartTable1582551346241 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `customer_cart` CHANGE `option_name` `option_name` Text DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `customer_cart` CHANGE `option_name` `option_name` Text DEFAULT NULL' );
    }
}
