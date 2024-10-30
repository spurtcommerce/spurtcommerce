import {MigrationInterface, QueryRunner} from 'typeorm';

export class DropColumnInVendorGroupTable1653556618413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `vendor_group` DROP COLUMN `color_code`' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `vendor_group` DROP COLUMN `color_code`' );
    }
}
