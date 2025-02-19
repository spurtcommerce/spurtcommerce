import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetIndustryIdToNull1733808519425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('UPDATE category SET industry_id = NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
