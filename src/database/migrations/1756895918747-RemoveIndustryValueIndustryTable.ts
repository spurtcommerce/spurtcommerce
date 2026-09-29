import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveIndustryValueIndustryTable1756895918747 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM industry WHERE slug = 'none';`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
