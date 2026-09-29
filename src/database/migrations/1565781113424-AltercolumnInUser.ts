import {MigrationInterface, QueryRunner} from 'typeorm';

export class AltercolumnInUser1565781113424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` CHANGE `delete_flag` `delete_flag` INT(11) DEFAULT 0' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` CHANGE `delete_flag` `delete_flag` INT(11) DEFAULT 0' );
    }

}
