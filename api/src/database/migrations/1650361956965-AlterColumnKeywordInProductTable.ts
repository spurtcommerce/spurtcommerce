import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterColumnKeywordInProductTable1650361956965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `product` CHANGE `keywords` `keywords` text ' );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `product` CHANGE `keywords` `keywords` text' );

    }
}
