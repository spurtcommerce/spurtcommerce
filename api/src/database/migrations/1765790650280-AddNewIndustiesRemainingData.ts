import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewIndustiesRemainingData1765790650280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` INSERT INTO industry (name, slug, is_active, is_delete, description)
            VALUES ('Fashion', 'fashion', 1, 0, 'Industry related to creativity, style, and innovation, influencing trends, culture and services');
    `);

        await queryRunner.query(` INSERT INTO industry (name, slug, is_active, is_delete, description)
            VALUES ('Network', 'network', 1, 0, 'Industry related to networking infrastructure and connectivity solutions');
    `);

        await queryRunner.query(` INSERT INTO industry (name, slug, is_active, is_delete, description)
            VALUES ('Food', 'food', 1, 0, 'Industry related to food products, catering, and culinary services');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
