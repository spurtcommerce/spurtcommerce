import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIndustrySlug1765807233902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE industry
            SET slug = 'construction',
                description = 'Construction industry related services and products'
            WHERE name = 'Construction';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET slug = 'textiles',
                description = 'Textile and garment manufacturing industry'
            WHERE name = 'Textiles';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET slug = 'books',
                description = 'Books publishing, printing and distribution industry'
            WHERE name = 'Books';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET slug = 'automotive',
                description = 'Automotive manufacturing and services industry'
            WHERE name = 'Automotive';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
