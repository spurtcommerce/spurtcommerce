import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAgricultureIndustry1765544093346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` INSERT INTO industry (name, slug, is_active, is_delete, description)
            VALUES ('Agriculture', 'agriculture', 1, 0, 'Industry related to agriculture products and services');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
