import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDuplicateRecordsInVedorGroupCategory1735801417071 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `WITH DuplicateRecords AS (
            SELECT MIN(id) AS keep_id
                FROM vendor_group_category
                GROUP BY vendor_group_id, category_id, is_active
                )
            DELETE FROM vendor_group_category
            WHERE id NOT IN (SELECT keep_id FROM DuplicateRecords)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
