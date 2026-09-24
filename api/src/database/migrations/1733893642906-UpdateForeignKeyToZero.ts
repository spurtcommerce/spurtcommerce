import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateForeignKeyToZero1733893642906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update all rows in the foreign key column to 0
        await queryRunner.query(`UPDATE \`category\` SET \`industry_id\` = 0;`);

        // Alter the foreign key column to set default value to 0
        await queryRunner.query(`ALTER TABLE \`category\` ALTER COLUMN \`industry_id\` SET DEFAULT 0;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
