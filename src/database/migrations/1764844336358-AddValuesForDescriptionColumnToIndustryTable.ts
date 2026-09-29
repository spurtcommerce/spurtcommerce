import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValuesForDescriptionColumnToIndustryTable1764844336358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Deliver innovative electronic solutions that empower people and drive sustainable progress'
            WHERE id = 1;
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'To advance healthcare through science, ensuring effective, and accessible medicines that improve lives worldwide safely'
            WHERE id = 2;
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'Creating durable leather goods that reflect quality and responsibility'
            WHERE id = 3;
        `);

        await queryRunner.query(`
            UPDATE industry
            SET description = 'To design and manufacture furniture that enhances everyday living and workspaces, combining durability, functionality, and aesthetic appeal'
            WHERE id = 4;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
