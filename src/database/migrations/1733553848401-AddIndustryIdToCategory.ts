import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIndustryIdToCategory1733553848401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasColumn = await queryRunner.hasColumn('category', 'industry_id');

        if (!hasColumn) {
            // Add the 'industry_id' column to the 'category' table
            await queryRunner.addColumn('category', new TableColumn({
                name: 'industry_id',
                type: 'int', // or 'bigint' or 'uuid' depending on the type you want
                isNullable: true, // set to false if it's required
            }));

            await queryRunner.query(`
                UPDATE category
                SET industry_id = (
                SELECT id
                FROM industry
                WHERE slug = 'other'
                LIMIT 1
              )
              WHERE industry_id IS NULL;
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
