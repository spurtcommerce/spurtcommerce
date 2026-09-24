import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnPaymentInformationInPaymentArchiveTable1656753952109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `payment_archive` CHANGE `payment_information` `payment_information` TEXT' );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `payment_archive` CHANGE `payment_information` `payment_information` TEXT' );
    }

}
