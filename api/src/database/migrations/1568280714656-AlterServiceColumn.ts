import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterServiceColumn1568280714656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `service` CHANGE `price` `price` decimal(10,2) DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `service` CHANGE `price` `price` decimal(10,2) DEFAULT NULL' );
    }

}
