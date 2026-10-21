import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndusryInIndustryTable1792589406509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO industry
                (name, slug, is_active, is_delete, description, created_date)
            VALUES
                ('Ecommerce', 'ecommerce', 1, 0, 'Ecommerce industry', NOW()),
                ('Clothing', 'clothing', 1, 0, 'Clothing industry', NOW()),
                ('Jewellery', 'jewellery', 1, 0, 'Jewellery industry', NOW());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM industry
            WHERE slug IN ('ecommerce', 'clothing', 'jewellery');
        `);
    }
}
