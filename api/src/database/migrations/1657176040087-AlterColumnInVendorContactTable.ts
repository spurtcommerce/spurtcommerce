import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnInVendorContactTable1657176040087 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor_contact` CHANGE `phone_number` `phone_number` VARCHAR(255)' );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor_contact` CHANGE `phone_number` `phone_number` VARCHAR(255)' );
    }
}
