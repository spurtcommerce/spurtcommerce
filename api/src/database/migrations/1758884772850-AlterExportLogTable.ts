import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterExportLogTable1758884772850 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE export_log;`);

        await queryRunner.query(`ALTER TABLE export_log
            ADD COLUMN created_by INT,
            ADD COLUMN modified_date DATETIME,
            ADD COLUMN modified_by INT;`);

        await queryRunner.query(`ALTER TABLE export_log
            RENAME COLUMN reference_id TO tenant_id;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
