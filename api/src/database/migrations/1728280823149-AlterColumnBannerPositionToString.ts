import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnBannerPositionToString1728280823149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Alter the 'position' column to type 'varchar'
        await queryRunner.query(`ALTER TABLE banner MODIFY position VARCHAR(155) null;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
