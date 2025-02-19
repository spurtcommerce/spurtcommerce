import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExportLogTableAddColumn1736404694182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // drop collumn created_by
        await queryRunner.query(`ALTER TABLE export_log DROP COLUMN created_by;`);
        // truncate table
        await queryRunner.query('TRUNCATE TABLE export_log;');
        // add collumn created_date, reference_type and reference_id
        await queryRunner.query(`
            ALTER TABLE export_log
            ADD COLUMN  reference_id INT,
            ADD COLUMN reference_type INT;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
