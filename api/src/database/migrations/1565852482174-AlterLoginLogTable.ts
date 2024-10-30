import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterLoginLogTable1565852482174 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `login_log` CHANGE `first_name` `first_name` VARCHAR(255) DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `login_log` CHANGE `first_name` `first_name` VARCHAR(255) DEFAULT NULL' );
    }

}
