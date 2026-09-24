import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionColumnInIndustry1763187289999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE industry
            ADD COLUMN description TEXT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
