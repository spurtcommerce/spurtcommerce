import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCoulmHideSpurtLogo1761121855833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `vendor_settings` ADD COLUMN `show_badge` TINYINT(1) NOT NULL DEFAULT 0;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
