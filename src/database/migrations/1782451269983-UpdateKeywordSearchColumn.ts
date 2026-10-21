import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateKeywordSearchColumn1782451269983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('search_suggestions');

        if (tableExists) {

            const columnExists = await queryRunner.hasColumn(
                'search_suggestions',
                'suggestions'
            );

            if (columnExists) {
                await queryRunner.query(`
                ALTER TABLE search_suggestions
                MODIFY COLUMN suggestions TEXT NOT NULL
            `);
            }
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
