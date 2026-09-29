import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewIndustry1765539019489 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            INSERT INTO industry (name, slug, is_active, is_delete, description, created_date)
            VALUES
            ('Construction', 'industrial and construction', 1, 0, 'Sample Industry 7 description', NOW());
        `);

        await queryRunner.query(`
            INSERT INTO industry (name, slug, is_active, is_delete, description, created_date)
            VALUES
            ('Textiles', 'textiles apparel and accessories', 1, 0, 'Sample Industry 8 description', NOW());
        `);

        await queryRunner.query(`
            INSERT INTO industry (name, slug, is_active, is_delete, description, created_date)
            VALUES
            ('Books', 'books publishing and educational materials', 1, 0, 'Sample Industry 10 description', NOW());
        `);

        await queryRunner.query(`
            INSERT INTO industry (name, slug, is_active, is_delete, description, created_date)
            VALUES
            ('Automotive','automative and machinaries', 1, 0, 'Sample Industry 12 description', NOW());
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
