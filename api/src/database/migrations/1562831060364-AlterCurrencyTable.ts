import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterCurrencyTable1562831060364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `currency` CHANGE `symbol_left` `symbol_left` VARCHAR(32) COLLATE utf8mb4_unicode_ci NULL');
        await queryRunner.query('ALTER TABLE `currency` CHANGE `symbol_Right` `symbol_Right` VARCHAR(32) COLLATE utf8mb4_unicode_ci NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `currency` CHANGE `symbol_left` `symbol_left` VARCHAR(32) COLLATE utf8mb4_unicode_ci NULL');
        await queryRunner.query('ALTER TABLE `currency` CHANGE `symbol_Right` `symbol_Right` VARCHAR(32) COLLATE utf8mb4_unicode_ci NULL');
    }
}
