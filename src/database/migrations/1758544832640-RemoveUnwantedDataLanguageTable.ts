import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUnwantedDataLanguageTable1758544832640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM language WHERE name IN ('thoams', 'test');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
