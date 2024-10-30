import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterBannerTable1621952242474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `banner` CHANGE `banner_group_banner_group_id` `banner_group_banner_group_id` int DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `banner` CHANGE `banner_group_banner_group_id` `banner_group_banner_group_id` int DEFAULT NULL' );

    }

}
