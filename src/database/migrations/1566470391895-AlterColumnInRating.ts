import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnInRating1566470391895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `product` CHANGE `rating` `rating` decimal(10,2) DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `product` CHANGE `rating` `rating` decimal(10,2) DEFAULT NULL' );
    }

}
