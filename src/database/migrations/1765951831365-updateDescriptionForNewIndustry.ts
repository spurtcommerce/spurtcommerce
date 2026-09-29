import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDescriptionForNewIndustry1765951831365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE industry
            SET description = 'Access apparel, accessories, and fashion manufacturing services from global brands and private label vendors.'
            WHERE name = 'Fashion';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Procure networking hardware, infrastructure solutions, and connectivity services from certified partners.'
            WHERE name = 'Network';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Source bulk food products, ingredients, and beverages directly from certified manufacturers and distributors.'
            WHERE name = 'Food';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Purchase seeds, agri inputs, equipment, and farm supplies from trusted agribusiness partners. '
            WHERE name = 'Agriculture';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Connect with trusted suppliers for construction materials, machinery, and project services in one unified B2B marketplace.'
            WHERE name = 'Construction';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Source fabrics, yarns, and garment manufacturing services directly from verified textile producers and mills.'
            WHERE name = 'Textiles';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Bulk order books from publishers, distributors, and printers for retail, institutional, and corporate needs.'
            WHERE name = 'Books';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Procure automotive parts, accessories, and service solutions from OEMs and certified distributors.'
            WHERE name ='Automotive';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Discover and purchase electronic components, devices, and solutions from leading manufacturers and wholesalers.'
            WHERE name ='Electronics';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Streamline sourcing of medicines, medical supplies, and healthcare products from compliant pharma suppliers.'
            WHERE name ='Pharma';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Buy leather raw materials, finished goods, and accessories from specialized tanneries and manufacturers.'
            WHERE name ='Leather';
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Source office, home, and commercial furniture directly from manufacturers for projects and bulk orders.'
            WHERE name ='Furniture';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
