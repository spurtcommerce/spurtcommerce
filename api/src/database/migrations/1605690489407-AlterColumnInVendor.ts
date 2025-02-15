import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnInVendor1605690489407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `company_description` `company_description` Text DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor` CHANGE `company_description` `company_description` Text DEFAULT NULL' );
    }

}
